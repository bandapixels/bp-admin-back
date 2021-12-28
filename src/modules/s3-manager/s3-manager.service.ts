import { Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { S3 } from 'aws-sdk';
import { Readable } from 'stream';
import { AwsConfig } from '../config/models/aws.config';

@Injectable()
export class S3ManagerService {
  private;

  constructor(
    private awsConfig: AwsConfig,
    @InjectAwsService(S3) private readonly s3: S3,
  ) {}

  async listBuckets(): Promise<any> {
    return this.s3.listBuckets().promise();
  }

  async upload(key: string, content: Readable | Buffer) {
    return this.s3
      .upload({ Bucket: this.awsConfig.s3Bucket, Key: key, Body: content })
      .promise();
  }

  async headObject(key: string) {
    return this.s3
      .headObject({
        Bucket: this.awsConfig.s3Bucket,
        Key: key,
      })
      .promise();
  }

  getObject(key: string) {
    return this.s3
      .getObject({
        Bucket: this.awsConfig.s3Bucket,
        Key: key,
      })
      .createReadStream();
  }
}
