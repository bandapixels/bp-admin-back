import { IsExistInDb } from '../../../validation/isExistInDb';
import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';
import { EntityNames } from '../../../common/constants/entityNames';

export class PublishOrDeletePostDto {
  @Transform(({ value }) => +value)
  @IsInt()
  @IsExistInDb(EntityNames.posts)
  id: number;
}
