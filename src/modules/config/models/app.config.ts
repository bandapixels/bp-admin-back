import { Injectable } from '@nestjs/common';

import { AppConfigService } from '../app.config.service';

@Injectable()
export class AppConfig {
  readonly port: number;

  readonly hurmaBandapixelsBaseUrl: string;

  readonly apiUrl: string;

  readonly clientUrl: string;

  constructor(private readonly configService: AppConfigService) {
    this.port = +this.configService.get('PORT');
    this.hurmaBandapixelsBaseUrl = this.configService.get(
      'HURMA_BANDAPIXELS_BASE_URL',
    );
    this.apiUrl = this.configService.get('API_URL');
    this.clientUrl = this.configService.get('CLIENT_URL');
  }
}
