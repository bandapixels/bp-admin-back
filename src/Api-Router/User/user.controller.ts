import {Headers, Body, Controller, Get, Post} from '@nestjs/common';
import {UserService} from 'src/Service/User/user.service';
import {UserDto} from 'dto/createUser.dto';
import valid from 'src/Helpers/incoming.data.validator';

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {
  }

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

  @Post('/login')
  login(@Body() UserDto: UserDto): any {
    const logined = this.appService.login(UserDto);

    if (!logined) {
      throw new Error('Error authorization, enter other details later');
    }
    return logined;
  }

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
