import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { ContactUsDto } from './dto/contactUs.dto';

@Controller('contact')
export class ContactUsController {
  constructor(private readonly mailService: MailService) {}

  @HttpCode(204)
  @Post('/')
  public async sendContactEmail(@Body() body: ContactUsDto): Promise<void> {
    await this.mailService.contactUs(body);
  }
}
