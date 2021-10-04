import { Injectable } from '@nestjs/common';
import {User} from '../../entity/User'
import {getConnection} from "typeorm";
import {UserDto} from "dto/createUser.dto";

@Injectable()
export class AppService implements User{
  constructor() {
  }

  async registration(userData: UserDto): Promise<boolean> {

    // const searchUser = await getConnection().getRepository('user').findOne({
    //   where: {email: userData.email}});
    //
    // if(searchUser)
    //   return false;
    //
      userData.token = 'inactive';
      const user = await getConnection().getRepository('user').create(userData);
      await getConnection().getRepository('user').save(user);
      return true;

  }

  async login(userData: UserDto): Promise<any> {
    const user = await getConnection().getRepository('user').findOne({
        where: {email: userData.email, password: userData.password},
        attributes: ['name'],
      });
    if (!user)
      return {status: false, error: "user not exists"}
    return user;
  }

  async logout(): Promise<string> {
    return 'Logout!';
  }

  async allUsers(): Promise<any> {
    const users = await getConnection().getRepository('user').find()
    return users;
  }

  created_at: Date;
  email: string;
  id: number;
  name: string;
  token: string;
  password: string;
  updated_at: Date;
}
