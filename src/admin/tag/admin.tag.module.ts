import { Module } from '@nestjs/common';
import { AdminTagController } from './admin.tag.controller';
import AdminTagService from './admin.tag.service';
import { DatabaseModule } from '../../Config/database.module';
import { adminTagProviders } from './admin.tag.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [AdminTagController],
  providers: [...adminTagProviders, AdminTagService],
})
export default class AdminTagModule {}
