import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from '../entity/User';
import {UserService} from 'src/Service/User/user.service';
import {UserController} from 'src/Api-Router/User/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class UsersModule {
}
