import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, LessThan, MoreThan, Repository, UpdateResult } from 'typeorm';

import AdminTagsService from '../tags/admin.tags.service';
import { Posts } from './entity/posts.entity';
import { slugify } from './helpers/slugify';
import { FilesService } from '../files/files.service';
import { CreateOrUpdatePostDto } from './dto/createOrUpdatePost.dto';
import { Files } from '../files/entity/files.entity';
import { S3ManagerService } from '../s3-manager/s3-manager.service';

@Injectable()
export default class PostService {
  constructor(
    @InjectRepository(Posts)
    private adminPostRepository: Repository<Posts>,

    @InjectRepository(Files)
    private adminFilesRepository: Repository<Files>,

    private readonly s3ManagerService: S3ManagerService,
    private readonly adminTagService: AdminTagsService,
    private readonly filesService: FilesService,
  ) {}

  private async generateSlugForPost(postHead: string): Promise<string> {
    let slug = slugify(postHead);

    const isSlugExist = await this.adminPostRepository.findOne({
      select: ['slug'],
      where: {
        slug: ILike(`%${slug}%`),
      },
      order: {
        id: 'DESC',
      },
    });

    if (isSlugExist) {
      const lastCreatedSlug = isSlugExist.slug.split('-');

      const biggestSlugNumber = lastCreatedSlug[lastCreatedSlug.length - 1];

      slug += `${
        Number.isNaN(+biggestSlugNumber) ? '-1' : `-${+biggestSlugNumber + 1}` // check if first duplicate. If true -1 else biggestSlugNumber + 1
      }`;
    }

    return slug;
  }

  public async getAllPosts(skipNum, takeNum) {
    const totalCount = await this.adminPostRepository.count();

    const posts = await this.adminPostRepository
      .createQueryBuilder('posts')
      .select([
        'posts.id',
        'posts.excerpt',
        'posts.createdAt',
        'posts.head',
        'posts.createdAt',
        'posts.slug',
        'files.id',
        'files.type',
      ])
      .leftJoin('posts.files', 'files')
      .skip(skipNum)
      .take(takeNum)
      .getMany();

    return {
      posts,
      totalCount,
    };
  }

  public async createPost(createPostDto: CreateOrUpdatePostDto) {
    const tags = await this.adminTagService.getTagsByIds(createPostDto.tagsIds);

    const files = await this.filesService.findFiles([
      createPostDto.imageId,
      createPostDto.previewImageId,
    ]);

    const slug = await this.generateSlugForPost(createPostDto.head);

    const post = this.adminPostRepository.create({
      ...createPostDto,
      tags,
      slug,
      files,
    });

    return this.adminPostRepository.save(post);
  }

  public async getPostById(id: number) {
    return this.adminPostRepository.findOneOrFail(id, {
      relations: ['tags', 'files'],
    });
  }

  public async getPostBySlug(slug: string): Promise<Posts> {
    return this.adminPostRepository.findOneOrFail({
      where: {
        slug,
      },
      relations: ['files', 'tags'],
    });
  }

  public async updatePost(id: number, updatePost: CreateOrUpdatePostDto) {
    const slug = await this.generateSlugForPost(updatePost.head);

    const post = await this.adminPostRepository.create({
      id,
      slug,
      ...updatePost,
    });

    return this.adminPostRepository.save(post);
  }

  public async publishPosh(id: number): Promise<UpdateResult> {
    return this.adminPostRepository.update(
      {
        id,
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
      },
      {
        published: false,
        publishedAt: null,
      },
    );
  }

  public async deletePost(id) {
    const postsFiles = await this.adminFilesRepository.find({
      where: {
        post: id,
      },
      select: ['fileName'],
    });

    for (let i = 0; i < postsFiles.length; i++) {
      await this.s3ManagerService.deleteFile(postsFiles[i].fileName);
    }

    return this.adminPostRepository.delete(id);
  }

  public async getPreviousAndNextPosts(
    post: Posts,
  ): Promise<{ previousPost?: Posts; nextPost?: Posts }> {
    const previousPost = await this.adminPostRepository.findOne({
      where: {
        createdAt: LessThan(post.createdAt),
      },
      select: ['id', 'excerpt', 'head', 'createdAt', 'minutes_to_read', 'slug'],
      relations: ['files'],
    });

    const nextPost = await this.adminPostRepository.findOne({
      where: {
        createdAt: MoreThan(post.createdAt),
      },
      select: ['id', 'excerpt', 'head', 'createdAt', 'minutes_to_read', 'slug'],
      relations: ['files'],
    });

    return {
      previousPost,
      nextPost,
    };
  }
}
