import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Render, Req, Res,
  UsePipes,
} from '@nestjs/common';
import {UserService} from 'src/auth/Service/User/user.service';
import {ERRORS_AUTH} from '../../constants/errors';
import {UserDto} from '../dto/createUser.dto';
import * as dotenv from 'dotenv';
import {CreateUserSchema} from 'src/auth/Helpers/incoming.data.validator';
import {JoiValidationPipe} from "src/filter/joi.validation.pipe";
import {encode} from "src/auth/Helpers/hash.password";

dotenv.config({path: '../../../.errors.env'});
import {Request} from "express";

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {
  }

  @Get('/login')
  @Render('auth/login.ejs')
  async loginPage(@Body() UserDto: UserDto, @Req() request: Request, @Res() res) {
    if (request.cookies.password && request.cookies.email) {
      request.cookies.password = encode(request.cookies.password);
      if (await this.appService.login(request.cookies))
        res.redirect('/users/admin/home')
    }
  }

  @Post('/login')
  @UsePipes(new JoiValidationPipe(CreateUserSchema))
  async login(@Body() UserDto: UserDto): Promise<void> {
    UserDto.password = encode(UserDto.password);
    const logined = await this.appService.login(UserDto);

    if (!logined) throw new Error(ERRORS_AUTH.AUTHORIZATION_ERROR);
    return logined;
  }

  @Get('/admin/home')
  @Render('admin/home.ejs')
  home(): void {
  }

  @Post('/auth/logout')
  logout(@Body() UserDto: UserDto): Promise<void> {
    const loggingOut = this.appService.logout(UserDto);
    if (!loggingOut) {
      throw new Error(ERRORS_AUTH.USER_NOT_EXISTS);
    }
    return loggingOut;
  }

  @Get('/auth/new-jwt')
  newJwtByRefresh(@Headers() headers, @Body() UserDto: UserDto): Promise<void> {
    const createdToken = this.appService.newJwtByRefresh(headers, UserDto);
    if (!createdToken) {
      throw new Error(ERRORS_AUTH.USER_NOT_EXISTS);
    }
    return createdToken;
  }
}
