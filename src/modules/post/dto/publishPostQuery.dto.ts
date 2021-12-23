import { IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class PublishPostQueryDto {
  @Transform(({ value }) => value.toLowerCase() === 'true')
  @IsBoolean()
  publish: boolean;
}
