import {Body, Controller, Get, HttpException, Post} from '@nestjs/common';
import { AppService } from '../Service/app.service';
import {UserDto} from "dto/createUser.dto";
import {asyncFunctionWrapper} from "src/Helpers/async.function.wrapper";

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/all-users')
  allUsers(): any {
    const getUsers = this.appService.allUsers();
    if(!getUsers) {
      throw new Error('User not exists');
    }
    return getUsers;
  }

  @Post('/registration')
  registration(@Body() UserDto: UserDto): any {
    const register = this.appService.registration(UserDto);
    if(!register) {
      throw new Error('You cannot register, enter other details later');
    }
    return register;
  }

  @Post('/login')
  login(@Body() UserDto: UserDto): any {
    const logined = this.appService.login(UserDto);

    if(!logined) {
      throw new Error('Error authorization, enter other details later');
    }
    return logined;
  }
}
