import { IsExistInDb } from '../../../validation/isExistInDb';
import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class PublishOrDeletePostDto {
  @Transform(({ value }) => +value)
  @IsInt()
  @IsExistInDb('post')
  id: number;
}
