import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { S3ManagerService } from '../s3-manager/s3-manager.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/jwt-auth.roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../../common/constants/role';
import { Response } from 'express';
import { AWSError } from 'aws-sdk';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { UploadFileQueryDto } from './dto/uploadFileQuery.dto';
import { GetFileContentParamsDto } from './dto/getFileContentParams.dto';
import { Files } from './entity/files.entity';

@Controller('admin/files')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class FilesController {
  constructor(
    private s3Service: S3ManagerService,
    private filesService: FilesService,
  ) {}

  @Get('/')
  private async getFilesList(): Promise<Files[]> {
    return this.filesService.findFiles();
  }

  @Get('/:id')
  private async getFile(
    @Param() params: GetFileContentParamsDto,
    @Res() res: Response,
  ): Promise<Response> {
    try {
      const { fileName } = await this.filesService.findFile(params.id);

      await this.s3Service.headObject(fileName);

      return this.s3Service.getObject(fileName).pipe(res);
    } catch (e) {
      throw (e as AWSError).statusCode === 404
        ? new NotFoundException('file not found')
        : new InternalServerErrorException(e);
    }
  }

  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 1024 * 1024 * 5 }, // limit 5mb
      fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException('only image files are allowed'),
            false,
          );
        }

        return cb(null, true);
      },
    }),
  )
  @Post('/')
  private async upload(
    @UploadedFile() file: Express.Multer.File,
    @Query() query: UploadFileQueryDto = { type: 'IMAGE' },
  ): Promise<Files> {
    if (!file) {
      throw new BadRequestException('provide file');
    }

    const { originalname, size, mimetype: mimeType } = file;

    const fileName = `${new Date().getTime().toString()}-${originalname}`;

    const { Location: s3Path } = await this.s3Service.upload(
      fileName,
      file.buffer,
    );

    return this.filesService.createFile({
      s3Path,
      fileName,
      size,
      mimeType,
      type: query.type,
    });
  }
}
