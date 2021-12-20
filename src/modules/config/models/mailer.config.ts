import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app.config.service';

@Injectable()
export class MailerConfig {
  readonly user: string;
  readonly password: number;

  constructor(private readonly configService: AppConfigService) {
    this.user = this.configService.get('BANDA_EMAIL');
    this.password = this.configService.get('BANDA_EMAIL_PASSWORD');
  }
}
