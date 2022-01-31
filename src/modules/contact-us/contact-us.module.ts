import { Module } from '@nestjs/common';
import { ContactUsController } from './contact-us.controller';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
import { AppConfigService } from '../config/app.config.service';
import { AppConfigModule } from '../config/app.config.module';

@Module({
  imports: [MailModule, AppConfigModule],
  controllers: [ContactUsController],
  providers: [MailService, AppConfigService],
})
export class ContactUsModule {}
