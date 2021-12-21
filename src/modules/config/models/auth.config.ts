import { Injectable } from '@nestjs/common';

import { AppConfigService } from '../app.config.service';

@Injectable()
export class AuthConfig {
  readonly sessionExpiresTime: number;

  readonly sessionSecretKey: string;

  constructor(private readonly configService: AppConfigService) {
    this.sessionExpiresTime = +this.configService.get('EXPIRES_TIME');
    this.sessionSecretKey = this.configService.get('SECRET_KEY_SESSION');
  }
}
