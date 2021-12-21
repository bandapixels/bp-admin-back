import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminPostController } from './admin.post.controller';
import AdminPostService from './admin.post.service';
import AdminTagModule from '../tag/admin.tag.module';
import { Post } from './entity/admin.post.entity';

@Module({
  imports: [AdminTagModule, TypeOrmModule.forFeature([Post])],
  controllers: [AdminPostController],
  providers: [AdminPostService],
})
export default class AdminPostModule {}