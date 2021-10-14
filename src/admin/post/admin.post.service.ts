import { Injectable } from '@nestjs/common';
import { Post } from './entities/admin.post.entity';
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
    newPost.tags = newPost?.tags?.length
      ? await this.adminTagService.getTagsByIds(newPost.tags)
      : [];
    const post = await this.adminPostRepository.create(newPost);
    return this.adminPostRepository.save(post);
  }
}
