import { Inject, Injectable } from '@nestjs/common';
import { Post } from './entities/admin.post.entity';
import { Repository } from 'typeorm';

@Injectable()
export default class AdminPostService {
  constructor(
    @Inject('ADMIN_POST_REPOSITORY')
    private adminPostRepository: Repository<Post>,
  ) {}

  public async getAllPosts(skipNum, takeNum) {
    return this.adminPostRepository.find({
      skip: skipNum,
      take: takeNum,
      relations: ['tags'],
    });
  }
}
