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
} from '@nestjs/common';

import PostService from './posts.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-auth.roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../common/constants/role';
import { CreatePostDto } from './dto/createPost.dto';
import { PublishOrDeletePostDto } from './dto/publishOrDeletePost.dto';
import { PublishPostQueryDto } from './dto/publishPostQuery.dto';

@Controller('admin/posts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class PostsController {
  constructor(private readonly adminPostService: PostService) {}

  @Get('/:id')
  public async getPost(@Param('id') id: string): Promise<any> {
    return this.adminPostService.getPostById(+id);
  }

  @Post('/')
  public async createPost(@Body() body: CreatePostDto) {
    return this.adminPostService.createPost(body);
  }

  @HttpCode(204)
  @Post('/:id/publish')
  public async changePublish(
    @Param() params: PublishOrDeletePostDto,
    @Query() query: PublishPostQueryDto,
  ) {
    return query.publish
      ? this.adminPostService.publishPosh(params.id)
      : this.adminPostService.unpublishPost(params.id);
  }

  @Delete('/:id')
  public async deletePost(@Param() params: PublishOrDeletePostDto) {
    return this.adminPostService.deletePost(params.id);
  }
}
