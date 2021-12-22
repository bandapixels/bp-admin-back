import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import PostService from './post.service';
import { PostDto } from './dto/post.dto';
import AdminTagService from '../tag/admin.tag.service';
import { ERRORS_POST } from '../../common/constants/errors';
import { imageFileFilter } from './helpers/image.file.filter';
import { editFileName } from './helpers/edit.file.name';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-auth.roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../common/constants/role';
import { CreatePostDto } from './dto/createPost.dto';

@Controller('admin/posts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class PostController {
  constructor(
    private readonly adminPostService: PostService,
    private readonly adminTagService: AdminTagService,
  ) {}

  @Get('/:id')
  public async getPost(@Param('id') id: string): Promise<any> {
    const post = await this.adminPostService.getPostById(+id);

    return post;
  }

  @Post('/create')
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
    @Body() newPost: CreatePostDto,
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

  @Post('/')
  public async createPost(@Body() body: CreatePostDto) {
    return this.adminPostService.createPost(body);
  }

  @Post('/:id/edit')
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
