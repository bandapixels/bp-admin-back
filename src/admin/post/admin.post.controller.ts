import { Controller, Get, Query, Render } from '@nestjs/common';
import AdminPostService from './admin.post.service';

@Controller('admin/posts')
export class AdminPostController {
  constructor(private readonly adminPostService: AdminPostService) {}

  @Get('/')
  @Render('layouts/app.ejs')
  public async getPosts(@Query('skip') skip = 0, @Query('take') take = 30) {
    const posts = await this.adminPostService.getAllPosts(skip, take);
    return { posts, body: '../admin/post/index.ejs', guest: false };
  }
}
