import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MailService } from '../mail/mail.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContactUsDto } from './dto/contactUs.dto';

@Controller('contact')
export class ContactUsController {
  constructor(private readonly mailService: MailService) {}

  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 1024 * 1024 * 10 }, // limit 10mb
      fileFilter(_req, file, cb) {
        if (file && !file.originalname.match(/\.(pdf|doc)$/)) {
          return cb(
            new BadRequestException('only image files are allowed'),
            false,
          );
        }

        return cb(null, true);
      },
    }),
  )
  @HttpCode(204)
  @Post('/')
  public async sendContactEmail(
    @Body() body: ContactUsDto,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<void> {
    file
      ? await this.mailService.joinOurTeam(body, file)
      : await this.mailService.contactUs(body);
  }
}
