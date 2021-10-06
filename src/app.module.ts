import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import { LoggerMiddleware } from './Middlewares/logger.middleware'
import {UserService} from 'src/Service/User/user.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from 'entity/User';
import {UserController} from 'src/Api-Router/User/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'newuser',
      password: 'password',
      database: 'banda',
      entities: [User],
      synchronize: true,
    })
  ],
  controllers: [UserController],
  providers: [UserService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/users/auth/');
  }
}
