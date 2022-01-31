import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Users } from './entity/users.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async finUserByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOne({ email });
  }
}
