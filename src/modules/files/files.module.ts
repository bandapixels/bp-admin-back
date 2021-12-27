import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { S3ManagerService } from '../s3-manager/s3-manager.service';
import { AppConfigModule } from '../config/app.config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entity/file.entity';

@Module({
  imports: [AppConfigModule, TypeOrmModule.forFeature([File])],
  controllers: [FilesController],
  providers: [FilesService, S3ManagerService],
})
export class FilesModule {}
