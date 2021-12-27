import { Injectable } from '@nestjs/common';
import { Not, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Post } from './entity/post.entity';
import AdminTagService from '../tag/admin.tag.service';
import { CreateOrUpdatePostDto } from './dto/createOrUpdatePost.dto';

@Injectable()
export default class PostService {
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

  public async createPost(createPostDto: CreateOrUpdatePostDto) {
    const tags = await this.adminTagService.getTagsByIds(createPostDto.tagsIds);

    delete createPostDto.tagsIds;

    const post = await this.adminPostRepository.create({
      ...createPostDto,
      tags,
    });

    return this.adminPostRepository.save(post);
  }

  public async getPostById(id) {
    return this.adminPostRepository.findOne(id, { relations: ['tags'] });
  }

  public async updatePost(id: number, updatePost: CreateOrUpdatePostDto) {
    const tags = updatePost.tagsIds
      ? await this.adminTagService.getTagsByIds(updatePost.tagsIds)
      : [];

    delete updatePost.tagsIds;

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

  public async publishPosh(id): Promise<UpdateResult> {
    return this.adminPostRepository.update(
      {
        id,
        published: false,
        publishedAt: null,
      },
      {
        published: true,
        publishedAt: new Date().toISOString(),
      },
    );
  }

  public async unpublishPost(id: number): Promise<UpdateResult> {
    return this.adminPostRepository.update(
      {
        id,
        published: true,
        publishedAt: Not(null),
      },
      {
        published: false,
        publishedAt: null,
      },
    );
  }

  public async deletePost(id) {
    return this.adminPostRepository.delete(id);
  }
}
