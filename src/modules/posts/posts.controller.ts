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
// @UseGuards(JwtAuthGuard, RolesGuard)
// @Roles(Role.ADMIN)
export class PostsController {
  constructor(private readonly adminPostService: PostService) {}

  @Get('/')
  public async getPostsList(
    @Query() query: GetPostsListQueryDto,
  ): Promise<{ posts: Posts[]; totalCount: number }> {
    return this.adminPostService.getAllPosts(query.skip, query.take);
  }

  @Get('/:id')
  public async getPost(@Param('id') id: string): Promise<Posts> {
    return instanceToPlain(
      await this.adminPostService.getPostById(+id),
    ) as Posts;
  }

  @Get('/content/:id')
  @Render('post/index.hbs')
  public async getPostContent(@Param('id') id: string): Promise<any> {
    const post = instanceToPlain(
      await this.adminPostService.getPostById(id),
    ) as Posts;

    const qwe = await this.adminPostService.getPreviousAndNextPosts(post);

    const { previousPost, nextPost } = instanceToPlain(qwe);

    return {
      API_URL: process.env.API_URL,
      URL: `${process.env.API_URL}/api/admin/posts/content/${post.id}`,
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
  ) {
    return query.publish.toLowerCase() === 'true'
      ? this.adminPostService.publishPosh(params.id)
      : this.adminPostService.unpublishPost(params.id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('/:id')
  public async updatePost(
    @Param() params: PublishOrDeletePostDto,
    @Body() body: CreateOrUpdatePostDto,
  ): Promise<Posts> {
    return this.adminPostService.updatePost(params.id, body);
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
