import { IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

export class GetTagsListQueryDto {
  @Transform(({ value }) => +value)
  @IsInt()
  skip: number;

  @Transform(({ value }) => +value)
  @IsInt()
  take: number;
}
