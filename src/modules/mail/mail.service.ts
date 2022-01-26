import { SentMessageInfo } from 'nodemailer';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { ContactUsDto } from '../contact-us/dto/contactUs.dto';
import { MailerConfig } from '../config/models/mailer.config';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private mailerConfig: MailerConfig,
  ) {}

  async contactUs(contactUs: ContactUsDto): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({
      to: this.mailerConfig.bandaTestEmail,
      subject: 'Discuss the project',
      text: `${contactUs.body} \n email: ${contactUs.email}`,
    });
  }

  async joinOurTeam(
    body: ContactUsDto,
    attachment: Express.Multer.File,
  ): Promise<SentMessageInfo> {
    return this.mailerService.sendMail({
      to: this.mailerConfig.bandaTestEmail,
      subject: 'Join our team',
      text: `${body.body} \n Email: ${body.email}`,
      attachments: [
        {
          filename: attachment.originalname,
          content: attachment.buffer,
        },
      ],
    });
  }
}
