import { SentMessageInfo } from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { ContactUsDto } from '../contact-us/dto/contactUs.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}
  async contactUs(contactUs: ContactUsDto): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({
      to: contactUs.email,
      subject: 'Discuss the project',
      text: contactUs.body,
    });
  }
}
