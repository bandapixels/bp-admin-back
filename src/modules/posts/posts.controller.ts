import { instanceToPlain } from 'class-transformer';
import {
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Controller,
  Query,
  Patch,
  Render,
} from '@nestjs/common';

import PostService from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-auth.roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../common/constants/role';
import { CreateOrUpdatePostDto } from './dto/createOrUpdatePost.dto';
import { PublishOrDeletePostDto } from './dto/publishOrDeletePost.dto';
import { PublishPostQueryDto } from './dto/publishPostQuery.dto';
import { GetPostsListQueryDto } from './dto/getPostsListQuery.dto';
import { Posts } from './entity/posts.entity';

@Controller('admin/posts')
export class PostsController {
  constructor(private readonly adminPostService: PostService) {}

  @Get('/')
  public async getPostsList(
    @Query() query: GetPostsListQueryDto,
  ): Promise<Posts[]> {
    const posts = await this.adminPostService.getAllPosts(query);

    return instanceToPlain(posts, {
      groups: ['single'],
    }) as Posts[];
  }

  @Get('/count')
  public async getPostsCount(): Promise<{ totalCount: number }> {
    return { totalCount: await this.adminPostService.countPosts() };
  }

  @Get('/info/:id')
  public async getPost(@Param('id') id: string): Promise<Posts> {
    return instanceToPlain(
      await this.adminPostService.getPostById(+id),
    ) as Posts;
  }

  @Get('/content/:slug')
  @Render('post/index.hbs')
  public async getPostContent(
    @Param('slug') slug: string,
  ): Promise<Record<string, unknown>> {
    const post = instanceToPlain(
      await this.adminPostService.getPostBySlug(slug),
      {
        groups: ['full'],
      },
    ) as Posts;

    let previousPost = null;
    let nextPost = null;

    if (post.published) {
      const { previousPost: previous, nextPost: next } = instanceToPlain(
        await this.adminPostService.getPreviousAndNextPosts(post),
        {
          groups: ['full'],
        },
      );

      previousPost = previous;
      nextPost = next;
    }
    return {
      API_URL: process.env.API_URL,
      post,
      nextPost,
      previousPost,
    };
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/')
  public async createPost(@Body() body: CreateOrUpdatePostDto) {
    return this.adminPostService.createPost(body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(204)
  @Post('/:id/publish')
  public async changePublish(
    @Param() params: PublishOrDeletePostDto,
    @Query() query: PublishPostQueryDto,
  ): Promise<void> {
    query.publish.toLowerCase() === 'true'
      ? await this.adminPostService.publishPosh(params.id)
      : await this.adminPostService.unpublishPost(params.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(204)
  @Patch('/:id')
  public async updatePost(
    @Param() params: PublishOrDeletePostDto,
    @Body() body: CreateOrUpdatePostDto,
  ): Promise<void> {
    await this.adminPostService.updatePost(params.id, body);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @HttpCode(204)
  @Delete('/:id')
  public async deletePost(
    @Param() params: PublishOrDeletePostDto,
  ): Promise<void> {
    await this.adminPostService.deletePost(params.id);
  }
}
