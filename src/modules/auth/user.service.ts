import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getConnection } from 'typeorm';

import { UserDto } from './dto/createUser.dto';
import { ERRORS_AUTH } from '../../common/constants/errors';
import { isCorrectPassword } from './Helpers/hash.password';

@Injectable()
export class UserService {
  async login(userData: UserDto): Promise<any> {
    const user: any = await getConnection()
      .getRepository('user')
      .findOne({
        where: { email: userData.email },
        attributes: ['name'],
      });
    if (user && isCorrectPassword(userData.password, user.password)) {
      return user;
    }
    throw new UnauthorizedException(ERRORS_AUTH.WRONG_CREDENTIALS_SUPPLIED);
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
