import { Injectable } from '@nestjs/common';

import { AppConfigService } from '../app.config.service';

@Injectable()
export class DbConfig {
  readonly host: string;

  readonly port: number;

  readonly username: string;

  readonly password: string;

  readonly database: string;

  constructor(private readonly configService: AppConfigService) {
    this.host = this.configService.get('TYPEORM_HOST');
    this.port = +this.configService.get('TYPEORM_PORT');
    this.username = this.configService.get('TYPEORM_USERNAME');
    this.password = this.configService.get('TYPEORM_PASSWORD');
    this.database = this.configService.get('TYPEORM_DATABASE');
  }
}
