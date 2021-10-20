import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/auth/Models/users.module';
import { UserController } from 'src/auth/Controllers/user.controller';
import { UserService } from 'src/auth/Service/User/user.service';
import { User } from 'src/auth/entity/User';
import * as dotenv from 'dotenv';
import { Tag } from 'src/admin/tag/entity/admin.tag.entity';
import AdminTagModule from 'src/admin/tag/admin.tag.module';
dotenv.config({});
import AdminPostModule from 'src/admin/post/admin.post.module';
import { MulterModule } from '@nestjs/platform-express';
import {APP_GUARD} from "@nestjs/core";
import {RolesGuard} from "src/auth/guards/roles.guard";
import {Post} from "src/admin/post/entity/admin.post.entity";

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
    AdminPostModule,

    MulterModule.register({
      dest: './uploads',
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
