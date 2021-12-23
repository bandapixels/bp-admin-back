import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostController } from './post.controller';
import PostService from './post.service';
import AdminTagModule from '../tag/admin.tag.module';
import { Post } from './entity/post.entity';

@Module({
  imports: [AdminTagModule, TypeOrmModule.forFeature([Post])],
  controllers: [PostController],
  providers: [PostService],
})
export default class PostModule {}
