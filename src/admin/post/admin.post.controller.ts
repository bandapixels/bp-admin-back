import {
  Body,
  Controller,
  Get,
  Param,
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
import { UpdatePostSchema } from './schema/update.post.schema';

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

  @Get('/:id/edit')
  @Render('layouts/app.ejs')
  public async editingPost(@Param('id') id) {
    const post = await this.adminPostService.getPostById(id);
    const tags = await this.adminTagService.getAllTags();
    return { post, tags, body: '../admin/post/edit.ejs', isAuthorized: true };
  }

  @Post('/:id/edit')
  @UsePipes(new JoiValidationPipe(UpdatePostSchema))
  public async editPost(
    @Body() editPost: PostDto,
    @Param('id') id,
    @Res() res,
  ) {
    await this.adminPostService.updatePost(id, editPost);
    res.redirect('/admin/posts');
  }

  @Get('/:id/publish')
  public async changePublish(@Param('id') id, @Res() res) {
    await this.adminPostService.changePublishValue(id);
    res.redirect('/admin/posts');
  }

  @Post('/:id/delete')
  public async deletePost(@Param('id') id) {
    return this.adminPostService.deletePost(id);
  }
}
