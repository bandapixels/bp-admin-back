import {forwardRef, MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserController} from "src/auth/Controllers/user.controller";
import {UserService} from "src/auth/Service/User/user.service";
import {User} from "src/auth/entity/User";
import {RolesGuard} from "src/auth/guards/roles.guard";

@Module({
  imports: [    forwardRef(() => UsersModule),
    TypeOrmModule.forFeature([User])],
  providers: [UserService, RolesGuard],
  controllers: [UserController],
})
export class UsersModule {
}

