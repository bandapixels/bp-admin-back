import { IsString, Length } from 'class-validator';

export class TagDto {
  @IsString()
  @Length(1, 64)
  name: string;
}
