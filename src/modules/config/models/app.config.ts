import { Injectable } from '@nestjs/common';

import { AppConfigService } from '../app.config.service';

@Injectable()
export class AppConfig {
  readonly port: number;

  readonly hurma_bandapixels_base_url: string;

  constructor(private readonly configService: AppConfigService) {
    this.port = +this.configService.get('PORT');
    this.hurma_bandapixels_base_url = this.configService.get(
      'HURMA_BANDAPIXELS_BASE_URL',
    );
  }
}
