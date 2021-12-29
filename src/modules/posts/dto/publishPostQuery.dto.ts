import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class PublishPostQueryDto {
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  publish: boolean;
}
