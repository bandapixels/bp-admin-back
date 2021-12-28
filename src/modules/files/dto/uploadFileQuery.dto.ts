import { IsIn, IsOptional } from 'class-validator';

export class UploadFileQueryDto {
  @IsOptional()
  @IsIn(['IMAGE', 'PREVIEW'])
  type: 'IMAGE' | 'PREVIEW';
}
