import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/auth/Models/users.module';
import { UserController } from 'src/auth/Controllers/user.controller';
import { UserService } from 'src/auth/Service/User/user.service';
import * as dotenv from 'dotenv';
import AdminTagModule from 'src/admin/tag/admin.tag.module';

dotenv.config({});
import AdminPostModule from 'src/admin/post/admin.post.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    TypeOrmModule.forRoot(),
    AdminTagModule,
    AdminPostModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
