import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import { ERRORS_AUTH } from '../../common/constants/errors';
import { UserDto } from './dto/createUser.dto';
import { CreateUserSchema } from './Helpers/incoming.data.validator';
import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { MailService } from '../mail/mail.service';
import { AuthConfig } from '../config/models/auth.config';

@Controller('users')
export class UserController {
  constructor(
    private readonly appService: UserService,
    private readonly mailService: MailService,
    private readonly authConfig: AuthConfig,
  ) {}

  @Get('/login')
  @Render('auth/login.ejs')
  async loginPage(
    @Body() UserDto: UserDto,
    @Req() request: Request,
    @Res() res,
  ) {
    if (
      request &&
      request.cookies &&
      request.cookies.password &&
      request.cookies.email &&
      (await this.appService.login(request.cookies))
    ) {
      res.redirect('/users/admin/home');
    }
  }

  @Post('/login')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  async login(
    @Body() UserDto: UserDto,
    @Res() res,
    @Req() request: Request,
  ): Promise<void> {
    const logined = await this.appService.login(UserDto);
    if (!logined) throw new Error(ERRORS_AUTH.AUTHORIZATION_ERROR);
    res
      .cookie('sessionID', request.sessionID, {
        expires: new Date(
          new Date().getTime() + this.authConfig.sessionExpiresTime,
        ),
        sameSite: 'strict',
        httpOnly: true,
      })
      .send(logined);
  }

  @Get('/admin/home')
  @Render('admin/home.ejs')
  home(): void {}

  @Post('/auth/logout')
  logout(@Body() UserDto: UserDto): Promise<void> {
    const loggingOut = this.appService.logout(UserDto);
    if (!loggingOut) {
      throw new Error(ERRORS_AUTH.USER_NOT_EXISTS);
    }
    return loggingOut;
  }
}
