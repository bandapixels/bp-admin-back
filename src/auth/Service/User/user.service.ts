import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import newTokenCreator from './utils/create.new.token';
import { UserDto } from 'src/auth/dto/createUser.dto';
import { User } from 'src/auth/entity/User';
import { Role } from 'src/auth/Models/role.enum';
import {ERRORS_AUTH} from "src/constants/errors";

@Injectable()
export class UserService implements User {
  constructor() {}

  async login(userData: UserDto): Promise<any> {
    const user: any = await getConnection()
      .getRepository('user')
      .findOne({
        where: { email: userData.email, password: userData.password },
        attributes: ['name'],
      });
    if (user) {
      user.refreshToken = newTokenCreator(user.email);
      await getConnection().getRepository('user').save(user);
      const jwtToken = newTokenCreator(user.email);
      return { user, jwtToken };
    } else {
      return { status: false, error: ERRORS_AUTH.USER_NOT_EXISTS };
    }
  }

  async logout(UserDto): Promise<any> {
    const searchUser: any = await getConnection()
      .getRepository('user')
      .findOne({
        where: { email: UserDto.email },
      });
    if (searchUser) {
      searchUser.refreshToken = 'inactive';
      await getConnection().getRepository('user').save(searchUser);
      return { status: true };
    }
    return { status: false };
  }

  async allUsers(): Promise<any> {
    const users = await getConnection().getRepository('user').find();
    return users;
  }

  async newJwtByRefresh(headers, user): Promise<any> {
    const jwtToken = newTokenCreator(user.name);
    return jwtToken;
  }

  created_at: Date;
  email: string;
  id: number;
  name: string;
  password: string;
  updated_at: Date;
  refreshToken: string;
  role: Role;
}
