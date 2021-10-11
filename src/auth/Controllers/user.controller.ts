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

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Roles(Role.USER)
  @UseGuards(RolesGuard)
  @Get('/all-users')
  allUsers(): any {
    const getUsers = this.appService.allUsers();
    if (!getUsers) {
      throw new Error('User not exists');
    }
    return getUsers;
  }

  @Post('/registration')
  async registration(@Body() UserDto: UserDto): Promise<any> {
    await valid.registrationLoginInputData(UserDto);
    const register = this.appService.registration(UserDto);
    if (!register) {
      throw new Error('You cannot register, enter other details later');
    }
    return register;
  }

  @Get('/login')
  @Render('auth/login.blade.ejs')
  loggin(@Body() UserDto: UserDto): any {}

  @Post('/login')
  login(@Body() UserDto: UserDto): any {
    console.log(UserDto);

    const logined = this.appService.login(UserDto);

    if (!logined) {
      throw new Error('Error authorization, enter other details later');
    }
    return logined;
  }

  @Get('/admin/home')
  @Render('admin/home.blade.ejs')
  home(): any {}

  @Get('/auth/logout')
  logout(@Body() UserDto: UserDto): any {
    const getUsers = this.appService.logout(UserDto);
    if (!getUsers) {
      throw new Error('User not exists');
    }
    return getUsers;
  }

  @Get('/auth/new-jwt')
  newJwtByRefresh(@Headers() headers, @Body() UserDto: UserDto): any {
    const getUsers = this.appService.newJwtByRefresh(headers, UserDto);
    if (!getUsers) {
      throw new Error('User not exists');
    }
    return getUsers;
  }
}
