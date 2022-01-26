import { Injectable } from '@nestjs/common';

import { AppConfigService } from '../app.config.service';

@Injectable()
export class MailerConfig {
  readonly bandaEmail: string;

  readonly password: string;

  readonly bandaTestEmail: string;

  constructor(private readonly configService: AppConfigService) {
    this.bandaEmail = this.configService.get('BANDA_EMAIL');
    this.password = this.configService.get('BANDA_EMAIL_PASSWORD');
    this.bandaTestEmail = this.configService.get('BANDA_TEST_EMAIL');
  }
}
