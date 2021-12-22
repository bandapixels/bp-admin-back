import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Render,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';

import { UserService } from './user.service';
import { UserDto } from '../auth/dto/createUser.dto';
import { MailService } from '../mail/mail.service';
import { AuthConfig } from '../config/models/auth.config';
import { UserLoginDto } from './dto/user.login.dto';
import { AuthService } from '../auth/auth.service';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-auth.roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../common/constants/role';

@Controller('users')
export class UserController {
  constructor(
    private readonly appService: UserService,
    private readonly mailService: MailService,
    private readonly authConfig: AuthConfig,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('/login')
  @Render('auth/login.ejs')
  async loginPage(
    @Body() UserDto: UserDto,
    @Req() request: Request,
    @Res() res,
    @CurrentUser() user: User,
  ) {
    if (user) {
      res.redirect('/users/admin/home');
    }
  }

  @Post('login')
  @HttpCode(200)
  async login(
    @Body() userData: UserLoginDto,
  ): Promise<{ access_token: string }> {
    const reqUser = await this.userService.finUserByEmail(userData.email);
    if (!reqUser) {
      throw new UnauthorizedException('Wrong email or password');
    }
    return this.authService.login(reqUser, userData.password);
  }

  @Get('/admin/home')
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Roles(Role.ADMIN)
  // @Render('admin/home.ejs')
  home(@Res() res): void {
    return res.render('admin/home.ejs');
  }
}
