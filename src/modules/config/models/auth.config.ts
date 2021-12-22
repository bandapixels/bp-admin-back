import { Injectable } from '@nestjs/common';
import { AppConfigService } from '../app.config.service';

@Injectable()
export class AuthConfig {
  readonly jwtSecret: string;
  readonly jwtExpiration: string;

  constructor(private readonly configService: AppConfigService) {
    this.jwtSecret = this.configService.get('JWT_SECRET');
    this.jwtExpiration = this.configService.get('JWT_EXPIRATION');
  }
}
