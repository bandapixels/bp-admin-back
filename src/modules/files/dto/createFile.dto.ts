import { IsIn, IsNumber, IsString, IsUrl } from 'class-validator';

export class CreateFileDto {
  @IsString()
  @IsUrl()
  s3Path: string;

  @IsString()
  fileName: string;

  @IsNumber()
  size: number;

  @IsString()
  mimeType: string;

  @IsIn(['IMAGE', 'PREVIEW'])
  type: 'IMAGE' | 'PREVIEW';
}
