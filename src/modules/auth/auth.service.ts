import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Users } from '../users/entity/users.entity';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(
    user: Users,
    userReqPassword: string,
  ): Promise<{ access_token: string }> {
    const { id, role, password } = user;
    const isPasswordCorrect = await compare(userReqPassword, password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Wrong email or password');
    }

    return {
      access_token: this.jwtService.sign({ sub: id, role }),
    };
  }
}
