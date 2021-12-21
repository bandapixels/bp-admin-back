import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Post } from './entity/admin.post.entity';
import { PostDto } from './dto/post.dto';
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

  public async getPostById(id) {
    return this.adminPostRepository.findOne(id, { relations: ['tags'] });
  }

  public async updatePost(id: number, updatePost: PostDto) {
    const tags = updatePost.tags
      ? await this.adminTagService.getTagsByIds(updatePost.tags)
      : [];

    delete updatePost.tags;

    if (!updatePost.image) {
      delete updatePost.image;
    }

    if (!updatePost.preview_image) {
      delete updatePost.preview_image;
    }

    await this.adminPostRepository.update(id, { ...updatePost });

    const post = await this.adminPostRepository.findOne(id);

    post.tags = tags;

    return this.adminPostRepository.save(post);
  }

  public async changePublishValue(id) {
    const post = await this.adminPostRepository.findOne(id);
    post.public = !post.public;
    return this.adminPostRepository.save(post);
  }

  public async deletePost(id) {
    return this.adminPostRepository.delete(id);
  }
}
