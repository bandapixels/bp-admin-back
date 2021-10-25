import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { UserDto } from 'src/auth/dto/createUser.dto';
import { ERRORS_AUTH } from 'src/constants/errors';
import { isCorrectPassword } from 'src/auth/Helpers/hash.password';

@Injectable()
export class UserService {
  constructor() {}

  async login(userData: UserDto): Promise<any> {
    const user: any = await getConnection()
      .getRepository('user')
      .findOne({
        where: { email: userData.email },
        attributes: ['name'],
      });
    if (user && isCorrectPassword(userData.password, user.password)) {
      return { user };
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
      await getConnection().getRepository('user').save(searchUser);
      return { status: true };
    }
    return { status: false };
  }
}
