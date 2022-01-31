import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsController } from './posts.controller';
import PostService from './posts.service';
import AdminTagsModule from '../tags/admin.tags.module';
import { Posts } from './entity/posts.entity';
import { FilesService } from '../files/files.service';
import { FilesModule } from '../files/files.module';
import { Files } from '../files/entity/files.entity';
import { S3ManagerService } from '../s3-manager/s3-manager.service';
import { AppConfigModule } from '../config/app.config.module';

@Module({
  imports: [
    FilesModule,
    AdminTagsModule,
    AppConfigModule,
    TypeOrmModule.forFeature([Posts, Files]),
  ],
  controllers: [PostsController],
  providers: [PostService, FilesService, S3ManagerService],
})
export default class PostsModule {}
