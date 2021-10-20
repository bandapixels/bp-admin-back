import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { UserDto } from 'src/auth/dto/createUser.dto';
import { User } from 'src/auth/entity/User';
import { Role } from 'src/auth/Models/role.enum';
import { ERRORS_AUTH } from 'src/constants/errors';

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
      return { user  };
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

  created_at: Date;
  email: string;
  id: number;
  name: string;
  password: string;
  updated_at: Date;
  refreshToken: string;
  role: Role;
}
