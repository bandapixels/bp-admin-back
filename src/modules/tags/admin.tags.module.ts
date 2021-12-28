import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AdminTagsController } from './admin.tags.controller';
import AdminTagsService from './admin.tags.service';
import { Tags } from './entity/admin.tags.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tags])],
  controllers: [AdminTagsController],
  providers: [AdminTagsService],
  exports: [AdminTagsService],
})
export default class AdminTagsModule {}
