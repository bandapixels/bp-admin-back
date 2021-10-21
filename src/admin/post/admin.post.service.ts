import { Injectable } from '@nestjs/common';
import { Post } from './entity/admin.post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import AdminTagService from '../tag/admin.tag.service';

@Injectable()
export default class AdminPostService {
  constructor(
    @InjectRepository(Post)
    private adminPostRepository: Repository<Post>,
    private readonly adminTagService: AdminTagService,
  ) {}

  public async getAllPosts(skipNum, takeNum) {
    return this.adminPostRepository.find({
      skip: skipNum,
      take: takeNum,
      relations: ['tags'],
    });
  }

  public async createPost(newPost: PostDto) {
    if (newPost.tags) {
      newPost.tags = await this.adminTagService.getTagsByIds(newPost.tags);
    } else newPost.tags = [];
    const post = await this.adminPostRepository.create(newPost);
    return this.adminPostRepository.save(post);
  }
}
