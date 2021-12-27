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
} from '@nestjs/common';

import PostService from './post.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-auth.roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../common/constants/role';
import { CreateOrUpdatePostDto } from './dto/createOrUpdatePost.dto';
import { PublishOrDeletePostDto } from './dto/publishOrDeletePost.dto';
import { PublishPostQueryDto } from './dto/publishPostQuery.dto';
import { Post as PostEntity } from './entity/post.entity';
import { GetPostsListQueryDto } from './dto/getPostsListQuery.dto';

@Controller('admin/posts')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class PostController {
  constructor(private readonly adminPostService: PostService) {}

  @Get('/all')
  public async getPostsList(
    @Query() query: GetPostsListQueryDto,
  ): Promise<PostEntity[]> {
    return this.adminPostService.getAllPosts(query.skip, query.take);
  }

  @Get('/:id')
  public async getPost(@Param('id') id: string): Promise<any> {
    return this.adminPostService.getPostById(+id);
  }

  @Post('/')
  public async createPost(@Body() body: CreateOrUpdatePostDto) {
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

  @Patch('/:id')
  public async updatePost(
    @Param() params: PublishOrDeletePostDto,
    @Body() body: CreateOrUpdatePostDto,
  ): Promise<any> {
    return this.adminPostService.updatePost(params.id, body);
  }

  @Delete('/:id')
  public async deletePost(@Param() params: PublishOrDeletePostDto) {
    return this.adminPostService.deletePost(params.id);
  }

  // @Post('/create')
  // @UseInterceptors(
  //   FileFieldsInterceptor(
  //     [
  //       { name: 'image', maxCount: 1 },
  //       { name: 'previewImage', maxCount: 1 },
  //     ],
  //     {
  //       storage: diskStorage({
  //         destination: './uploads',
  //       }),
  //       fileFilter: imageFileFilter,
  //     },
  //   ),
  // )
  // public async uploadFile(
  //   @UploadedFiles()
  //   files: {
  //     image?: Express.Multer.File[];
  //     previewImage?: Express.Multer.File[];
  //   },
  //   @Body() newPost: CreatePostDto,
  //   @Res() res,
  // ) {
  //   if (!files.image || !files.previewImage) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.FORBIDDEN,
  //         error: ERRORS_POST.COUNT_IMAGE,
  //       },
  //       HttpStatus.FORBIDDEN,
  //     );
  //   }
  //
  //   newPost.image = files.image[0].filename;
  //
  //   newPost.preview_image = files.previewImage[0].filename;
  //
  //   await this.adminPostService.createPost(newPost);
  //
  //   res.redirect('/admin/posts');
  // }

  // @Post('/:id/edit')
  // @UseInterceptors(
  //   FileFieldsInterceptor(
  //     [
  //       { name: 'image', maxCount: 1 },
  //       { name: 'previewImage', maxCount: 1 },
  //     ],
  //     {
  //       storage: diskStorage({
  //         destination: './uploads',
  //         filename: editFileName,
  //       }),
  //       fileFilter: imageFileFilter,
  //     },
  //   ),
  // )
  // public async uploadFileAndEditPost(
  //   @UploadedFiles()
  //   files: {
  //     image?: Express.Multer.File[];
  //     previewImage?: Express.Multer.File[];
  //   },
  //   @Body() editPost: PostDto,
  //   @Param('id') id,
  //   @Res() res,
  // ) {
  //   editPost.image = files.image ? files.image[0].filename : null;
  //   editPost.preview_image = files.previewImage
  //     ? files.previewImage[0].filename
  //     : null;
  //   await this.adminPostService.updatePost(id, editPost);
  //   res.redirect('/admin/posts');
  // }
}
