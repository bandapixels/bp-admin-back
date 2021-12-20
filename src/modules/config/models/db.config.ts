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
    this.host = this.configService.get('DB_HOST');
    this.port = +this.configService.get('DB_PORT');
    this.username = this.configService.get('DB_USERNAME');
    this.password = this.configService.get('DB_PASSWORD');
    this.database = this.configService.get('DATABASE');
  }
}
