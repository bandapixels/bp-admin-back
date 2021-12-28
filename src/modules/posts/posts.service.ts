import { Injectable } from '@nestjs/common';
import { Not, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Posts } from './entity/posts.entity';
import AdminTagsService from '../tags/admin.tags.service';
import { CreateOrUpdatePostDto } from './dto/createOrUpdatePost.dto';
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
    const totalCount = await this.adminPostRepository.count();

    const posts = await this.adminPostRepository.find({
      skip: skipNum,
      take: takeNum,
      relations: ['tags', 'files'],
    });

    return {
      posts,
      totalCount,
    };
  }

  public async createPost(createPostDto: CreateOrUpdatePostDto) {
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
    return this.adminPostRepository.findOneOrFail(id, {
      relations: ['tags', 'files'],
    });
  }

  public async updatePost(id: number, updatePost: CreateOrUpdatePostDto) {
    const tags = updatePost.tagsIds
      ? await this.adminTagService.getTagsByIds(updatePost.tagsIds)
      : [];

    delete updatePost.tagsIds;

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
