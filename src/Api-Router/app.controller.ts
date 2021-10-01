import {Body, Controller, Get} from '@nestjs/common';
import { AppService } from '../Service/app.service';
import CreateUserDto from "dto/reateUser.dto";

@Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/all-users')
  allUsers(): any {
    return this.appService.allUsers();
  }

  @Get('/registration')
  registration(@Body() createUserDto: CreateUserDto): any {
    return this.appService.registration(createUserDto);
  }
}
