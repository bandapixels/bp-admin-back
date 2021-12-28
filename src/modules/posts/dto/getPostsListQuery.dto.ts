import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class GetPostsListQueryDto {
  @Transform(({ value }) => +value)
  @IsInt()
  public skip: number;

  @Transform(({ value }) => +value)
  @IsInt()
  public take: number;
}
