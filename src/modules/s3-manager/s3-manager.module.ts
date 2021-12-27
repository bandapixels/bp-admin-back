import { Module } from '@nestjs/common';
import { S3ManagerService } from './s3-manager.service';
import { AwsConfig } from '../config/models/aws.config';
import { AppConfigService } from '../config/app.config.service';

@Module({
  imports: [AppConfigService],
  providers: [S3ManagerService, AppConfigService, AwsConfig],
  exports: [S3ManagerService],
})
export class S3ManagerModule {}
