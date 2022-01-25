import { Transform } from 'class-transformer';
import { IsBoolean, IsInt } from 'class-validator';

export class GetPostsListQueryDto {
  @Transform(({ value }) => +value)
  @IsInt()
  public skip = 0;

  @Transform(({ value }) => +value)
  @IsInt()
  public take = 10;

  @Transform(({ value }) => value)
  @IsBoolean()
  public published = true;
}
