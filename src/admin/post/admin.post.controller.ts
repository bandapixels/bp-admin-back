import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Render,
  Res,
  UsePipes,
} from '@nestjs/common';
import AdminPostService from './admin.post.service';
import { PostDto } from './dto/post.dto';
import AdminTagService from '../tag/admin.tag.service';
import { JoiValidationPipe } from '../../filter/joi.validation.pipe';
import { CreatePostSchema } from './schema/create.post.schema';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Role } from '../../auth/Models/role.enum';

@Controller('admin/posts')
@Roles(Role.ADMIN)
export class AdminPostController {
  constructor(
    private readonly adminPostService: AdminPostService,
    private readonly adminTagService: AdminTagService,
  ) {}

  @Get('/')
  @Render('layouts/app.ejs')
  public async getPosts(@Query('skip') skip = 0, @Query('take') take = 30) {
    const posts = await this.adminPostService.getAllPosts(skip, take);
    return { posts, body: '../admin/post/index.ejs', isAuthorized: true };
  }

  @Get('/create')
  @Render('layouts/app.ejs')
  public async creatingPost() {
    const tags = await this.adminTagService.getAllTags();
    return { tags, body: '../admin/post/create.ejs', isAuthorized: true };
  }

  @Post('/create')
  @UsePipes(new JoiValidationPipe(CreatePostSchema))
  public async createPost(@Body() newPost: PostDto, @Res() res) {
    await this.adminPostService.createPost(newPost);
    res.redirect('/admin/posts');
  }
}
