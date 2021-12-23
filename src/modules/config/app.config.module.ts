import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppConfigService } from './app.config.service';
import { AppConfig } from './models/app.config';
import { AuthConfig } from './models/auth.config';
import { DbConfig } from './models/db.config';
import { MailerConfig } from './models/mailer.config';
import { AwsConfig } from './models/aws.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    AppConfig,
    AuthConfig,
    DbConfig,
    MailerConfig,
    AwsConfig,
    AppConfigService,
    ConfigService,
  ],
  exports: [AppConfig, AppConfigService, AuthConfig, DbConfig, MailerConfig],
})
export class AppConfigModule {}
