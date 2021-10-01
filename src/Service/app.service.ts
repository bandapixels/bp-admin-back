import { Injectable } from '@nestjs/common';
import {User} from '../../entity/User'
import {getConnection} from "typeorm";
import CreateUserDto from "dto/reateUser.dto";

@Injectable()
export class AppService implements User{
  constructor() {
  }

  async registration(userData: CreateUserDto): Promise<string> {
    const user = await getConnection().getRepository('user').create(userData);
    await getConnection().getRepository('user').save(user);
    return 'Registration!';
  }

  async login(): Promise<string> {
    return 'Login!';
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
  password: string;
  updated_at: Date;
}
