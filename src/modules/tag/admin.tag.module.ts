import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminTagController } from './admin.tag.controller';
import AdminTagService from './admin.tag.service';
import { Tag } from './entity/admin.tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag])],
  controllers: [AdminTagController],
  providers: [AdminTagService],
  exports: [AdminTagService],
})
export default class AdminTagModule {}
