import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../Config/database.module';
import { AdminPostController } from './admin.post.controller';
import { adminPostProviders } from './admin.post.providers';
import AdminPostService from './admin.post.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminPostController],
  providers: [...adminPostProviders, AdminPostService],
})
export default class AdminPostModule {}
