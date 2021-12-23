import { IsInt, IsString } from 'class-validator';
import { Tag } from '../../tag/entity/admin.tag.entity';

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

  tags: Tag[];

  @IsInt()
  minutes_to_read: number;

  @IsString()
  body: string;
}
