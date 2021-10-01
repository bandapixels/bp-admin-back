import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/User';
import {AppService} from "src/Service/app.service";
import {AppController} from "src/Api-Router/app.controller";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AppService],
  controllers: [AppController],
})
export class UsersModule {}
