import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Render,
  Res,
  UploadedFiles,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import AdminPostService from './admin.post.service';
import { PostDto } from './dto/post.dto';
import AdminTagService from '../tag/admin.tag.service';
import { JoiValidationPipe } from '../../filter/joi.validation.pipe';
import { CreatePostSchema } from './schema/create.post.schema';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName } from 'src/admin/post/Helpers/edit.file.name';
import { imageFileFilter } from 'src/admin/post/Helpers/image.file.filter';
import { ERRORS_POST } from 'src/constants/errors';

@Controller('admin/posts')
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
          filename: editFileName,
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
    console.log(files);
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
}
