import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ContactUsDto } from '../contact-us/dto/contactUs.dto';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nice App! Confirm your Email',
      template: './confirmation',
      context: {
        name: user.name,
      },
    });
  }

  async contactUs(
    to: string,
    { email, name, company, projectType, task, skype, budget }: ContactUsDto,
  ): Promise<any> {
    const text = `Name - ${name}, email - ${email}, company name - ${company}, project type - ${projectType}, task - ${task}, budget - ${budget}${
      skype ? `, skype - ${skype}` : ''
    }`;

    return this.mailerService.sendMail({
      to,
      subject: 'Discuss the project',
      text,
    });
  }
}
