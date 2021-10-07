import {forwardRef, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersModule} from "src/auth/Models/users.module";
import {UserController} from "src/auth/Controllers/user.controller";
import {UserService} from "src/auth/Service/User/user.service";
import {LoggerMiddleware} from "src/auth/Middlewares/logger.middleware";
import {User} from "src/auth/entity/User";
import {ServeStaticModule} from "@nestjs/serve-static";
import { join } from 'path';


@Module({
  imports: [
    forwardRef(() => UsersModule),
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname, '../../', 'views'),   // <-- path to the static files
    // }),
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
