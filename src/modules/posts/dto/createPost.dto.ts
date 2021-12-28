import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistInDb } from '../../../validation/isExistInDb';

export class CreatePostDto {
  @ApiProperty({
    example: 'posts header',
    description: 'header for posts',
    required: true,
    type: 'string',
  })
  @IsString()
  head: string;

  @ApiProperty({
    example: 'subtitle example',
    description: 'posts subtitle',
    required: true,
    type: 'string',
  })
  @IsString()
  subtitle: string;

  @ApiProperty({
    example: 'qwe',
    description: 'posts excerpt',
    required: true,
    type: 'string',
  })
  @IsString()
  excerpt: string;

  @IsInt()
  @IsExistInDb('file', 'id')
  imageId: number;

  @IsInt()
  @IsExistInDb('file', 'id')
  previewImageId: number;

  @IsInt({ each: true })
  tagsIds: number[];

  @IsInt()
  minutes_to_read: number;

  @IsString()
  body: string;
}
