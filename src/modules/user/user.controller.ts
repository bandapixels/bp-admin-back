import {
  Post,
  Body,
  HttpCode,
  Controller,
  UnauthorizedException,
} from '@nestjs/common';

import { UserService } from './user.service';
import { MailService } from '../mail/mail.service';
import { AuthConfig } from '../config/models/auth.config';
import { UserLoginDto } from './dto/user.login.dto';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly appService: UserService,
    private readonly mailService: MailService,
    private readonly authConfig: AuthConfig,
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

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
}
