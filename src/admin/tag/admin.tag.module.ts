import { Module } from '@nestjs/common';
import { AdminTagController } from './admin.tag.controller';
import AdminTagService from './admin.tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from 'src/admin/tag/entity/admin.tag.entity';

@Module({
  controllers: [AdminTagController],
  providers: [AdminTagService],
  imports: [TypeOrmModule.forFeature([Tag])],

})
export default class AdminTagModule {}
