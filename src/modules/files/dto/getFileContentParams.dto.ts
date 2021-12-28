import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';
import { IsExistInDb } from '../../../validation/isExistInDb';
import { EntityNames } from '../../../common/constants/entityNames';

export class GetFileContentParamsDto {
  @Transform(({ value }) => +value)
  @IsInt()
  @IsExistInDb(EntityNames.files, 'id')
  id: number;
}
