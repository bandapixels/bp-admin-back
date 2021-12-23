import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AwsConfig {
  readonly accessKey: string;

  readonly secretKey: string;

  constructor(private readonly configService: ConfigService) {
    this.accessKey = configService.get('AWS_ACCESS_KEY');
    this.secretKey = configService.get('AWS_SECRET_KEY');
  }
}
