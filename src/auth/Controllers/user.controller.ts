import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Render,
  UseGuards,
} from '@nestjs/common';
import { UserService } from 'src/auth/Service/User/user.service';
import { ERRORS_AUTH } from '../../constants/errors';
import { UserDto } from '../dto/createUser.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/Models/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import * as dotenv from 'dotenv';
dotenv.config({ path: '../../../.errors.env' });

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Roles(Role.ADMIN)
  @UseGuards(RolesGuard)
  @Get('/all-users')
  allUsers(): Promise<void> {
    const getUsers = this.appService.allUsers();
    if (!getUsers) {
      throw new Error(ERRORS_AUTH.USER_NOT_EXISTS);
    }
    return getUsers;
  }

  @Get('/login')
  @Render('auth/login.ejs')
  loginPage(@Body() UserDto: UserDto): void {};

  @Post('/login')
  login(@Body() UserDto: UserDto): Promise<void> {
    console.log(UserDto);

    const logined = this.appService.login(UserDto);

    if (!logined) {
      throw new Error(ERRORS_AUTH.AUTHORIZATION_ERROR);
    }
    return logined;
  }

  @Get('/admin/home')
  @Render('admin/home.ejs')
  home(): void {}

  @Get('/auth/logout')
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
