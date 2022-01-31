import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';

import { MailService } from './mail.service';
import { AppConfigModule } from '../config/app.config.module';
import { MailerConfig } from '../config/models/mailer.config';

@Module({
  imports: [
    AppConfigModule,
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        auth: {
          user: process.env.BANDA_EMAIL,
          pass: process.env.BANDA_EMAIL_PASSWORD,
        },
      },
    }),
  ],
  providers: [MailService, MailerConfig],
  exports: [MailService],
})
export class MailModule {}
