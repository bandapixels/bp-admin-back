import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { IsExistInDb } from '../../../validation/isExistInDb';

export class GetFileContentParamsDto {
  @Transform(({ value }) => +value)
  @IsInt()
  @IsExistInDb('file')
  id: number;
}
