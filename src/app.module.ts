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
import { User } from 'src/auth/entity/User';
import * as dotenv from 'dotenv';
import { Tag } from 'src/admin/tag/entity/admin.tag.entity';
import AdminTagModule from 'src/admin/tag/admin.tag.module';
dotenv.config({});
import { Post } from './admin/post/entities/admin.post.entity';


@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE,
      entities: [User, Tag, Post],
      synchronize: true,
    }),
    AdminTagModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
