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
import valid from 'src/auth/Helpers/incoming.data.validator';
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
      throw new Error(process.env.USER_NOT_EXISTS);
    }
    return getUsers;
  }

  @Post('/registration')
  async registration(@Body() UserDto: UserDto): Promise<any> {
    await valid.registrationLoginInputData(UserDto);
    const register = this.appService.registration(UserDto);
    if (!register) {
      throw new Error(process.env.REGISTRATED_ERROR);
    }
    return register;
  }

  @Get('/login')
  @Render('auth/login.ejs')
  loginPage(@Body() UserDto: UserDto): void {};

  @Post('/login')
  login(@Body() UserDto: UserDto): Promise<void> {
    console.log(UserDto);

    const logined = this.appService.login(UserDto);

    if (!logined) {
      throw new Error(process.env.AUTHORIZATION_ERROR);
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
      throw new Error(process.env.USER_NOT_EXISTS);
    }
    return loggingOut;
  }

  @Get('/auth/new-jwt')
  newJwtByRefresh(@Headers() headers, @Body() UserDto: UserDto): Promise<void> {
    const createdToken = this.appService.newJwtByRefresh(headers, UserDto);
    if (!createdToken) {
      throw new Error(process.env.USER_NOT_EXISTS);
    }
    return createdToken;
  }
}
