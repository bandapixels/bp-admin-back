import { IsInt, IsString } from 'class-validator';
import { Tags } from '../../tags/entity/admin.tags.entity';
import { Files } from '../../files/entity/files.entity';

export class PostDto {
  @IsString()
  head: string;

  @IsString()
  subtitle: string;

  @IsString()
  excerpt: string;

  @IsString()
  image: string;

  @IsString()
  preview_image: string;

  tags: Tags[];

  files: Files[];

  @IsInt()
  minutes_to_read: number;

  @IsString()
  body: string;
}
