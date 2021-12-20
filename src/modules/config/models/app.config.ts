import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app.config.service';

@Injectable()
export class AppConfig {
  readonly port: number;

  constructor(private readonly configService: AppConfigService) {
    this.port = +this.configService.get('PORT');
  }
}
