import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Render,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import AdminPostService from './admin.post.service';
import { PostDto } from './dto/post.dto';
import AdminTagService from '../tag/admin.tag.service';
import { JoiValidationPipe } from '../../common/pipes/joi.validation.pipe';
import { CreatePostSchema } from './schema/create.post.schema';
import { UpdatePostSchema } from './schema/update.post.schema';
import { ERRORS_POST } from '../../common/constants/errors';
import { imageFileFilter } from './Helpers/image.file.filter';
import { editFileName } from './Helpers/edit.file.name';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-auth.roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../common/constants/role';

@Controller('admin/posts')
@UseGuards(JwtAuthGuard, RolesGuard)
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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'previewImage', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  public async uploadFile(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      previewImage?: Express.Multer.File[];
    },
    @Body() newPost: PostDto,
    @Res() res,
  ) {
    if (!files.image || !files.previewImage) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: ERRORS_POST.COUNT_IMAGE,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    newPost.image = files.image[0].filename;
    newPost.preview_image = files.previewImage[0].filename;
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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image', maxCount: 1 },
        { name: 'previewImage', maxCount: 1 },
      ],
      {
        storage: diskStorage({
          destination: './uploads',
          filename: editFileName,
        }),
        fileFilter: imageFileFilter,
      },
    ),
  )
  public async uploadFileAndEditPost(
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      previewImage?: Express.Multer.File[];
    },
    @Body() editPost: PostDto,
    @Param('id') id,
    @Res() res,
  ) {
    editPost.image = files.image ? files.image[0].filename : null;
    editPost.preview_image = files.previewImage
      ? files.previewImage[0].filename
      : null;
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
