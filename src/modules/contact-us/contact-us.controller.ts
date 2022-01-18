import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-auth.roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../common/constants/role';
import { ContactUsDto } from './dto/contactUs.dto';

@Controller('admin/contact-us')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class ContactUsController {
  constructor(private readonly mailService: MailService) {}

  @HttpCode(204)
  @Post('/contact')
  public async sendContactEmail(@Body() body: ContactUsDto): Promise<void> {
    await this.mailService.contactUs(body.sendTo, body);
  }
}
