import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty({
    example: 'post header',
    description: 'header for post',
    required: true,
    type: 'string',
  })
  @IsString()
  head: string;

  @ApiProperty({
    example: 'subtitle example',
    description: 'post subtitle',
    required: true,
    type: 'string',
  })
  @IsString()
  subtitle: string;

  @ApiProperty({
    example: 'qwe',
    description: 'post excerpt',
    required: true,
    type: 'string',
  })
  @IsString()
  excerpt: string;

  @IsString()
  image: string;

  @IsString()
  preview_image: string;

  @IsInt({ each: true })
  tagsIds: number[];

  @IsInt()
  minutes_to_read: number;

  @IsString()
  body: string;
}
