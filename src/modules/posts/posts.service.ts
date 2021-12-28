import { Injectable } from '@nestjs/common';
import { Not, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Posts } from './entity/posts.entity';
import { PostDto } from './dto/post.dto';
import AdminTagsService from '../tags/admin.tags.service';
import { CreatePostDto } from './dto/createPost.dto';
import { FilesService } from '../files/files.service';

@Injectable()
export default class PostService {
  constructor(
    @InjectRepository(Posts)
    private adminPostRepository: Repository<Posts>,
    private readonly adminTagService: AdminTagsService,
    private readonly filesService: FilesService,
  ) {}

  public async getAllPosts(skipNum, takeNum) {
    return this.adminPostRepository.find({
      skip: skipNum,
      take: takeNum,
      relations: ['tags', 'files'],
    });
  }

  public async createPost(createPostDto: CreatePostDto) {
    const tags = await this.adminTagService.getTagsByIds(createPostDto.tagsIds);

    const image = await this.filesService.findFile(
      createPostDto.imageId,
      'IMAGE',
    );

    const previewImage = await this.filesService.findFile(
      createPostDto.previewImageId,
      'PREVIEW',
    );

    delete createPostDto.tagsIds;

    const post = await this.adminPostRepository.create({
      ...createPostDto,
      tags,
      files: [image, previewImage],
    });

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

    // if (!updatePost.image) {
    //   delete updatePost.image;
    // }
    //
    // if (!updatePost.preview_image) {
    //   delete updatePost.preview_image;
    // }

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
