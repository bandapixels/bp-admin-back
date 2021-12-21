import { Tag } from '../../tag/entity/admin.tag.entity';

export class PostDto {
  head: string;

  subtitle: string;

  excerpt: string;

  image: string;

  preview_image: string;

  tags: Tag[];

  mins_to_read: number;

  body: string;
}
