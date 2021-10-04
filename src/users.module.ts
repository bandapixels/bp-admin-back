import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../entity/User';
import {AppService} from "src/Service/app.service";
import {AppController} from "src/Api-Router/app.controller";
import {AuthMiddleware} from "src/middlewares/uthorization.middleware";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AppService],
  controllers: [AppController],
})
export class UsersModule  {

  // configure(consumer: MiddlewareConsumer) {
  //   consumer
  //     .apply(AuthMiddleware)
  //     .forRoutes(AppController)
  // }
}
