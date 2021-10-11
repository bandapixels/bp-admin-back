import {
  forwardRef,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/auth/Models/users.module';
import { UserController } from 'src/auth/Controllers/user.controller';
import { UserService } from 'src/auth/Service/User/user.service';
import { LoggerMiddleware } from 'src/auth/Middlewares/logger.middleware';
import AdminTagModule from './admin/tag/admin.tag.module';
import { User } from './auth/entity/User';
import { Tag } from './admin/tag/entity/admin.tag.entity';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'newuser',
      password: 'password',
      database: 'banda',
      synchronize: true,
      entities: [User, Tag],
    }),
    AdminTagModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/users/auth/');
  }
}
