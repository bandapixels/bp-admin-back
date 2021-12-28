import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsExistInDb } from '../../../validation/isExistInDb';
import { EntityNames } from '../../../common/constants/entityNames';

export class CreateOrUpdatePostDto {
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

  @ApiProperty({
    example: 1,
    description: 'image id',
    required: true,
    type: 'integer',
  })
  @IsInt()
  @IsExistInDb(EntityNames.files, 'id')
  imageId: number;

  @ApiProperty({
    example: 2,
    description: 'image cover id',
    required: true,
    type: 'integer',
  })
  @IsInt()
  @IsExistInDb(EntityNames.files, 'id')
  previewImageId: number;

  @ApiProperty({
    example: [1, 2, 3],
    description: 'tags ids',
    required: true,
    type: 'array',
  })
  @IsInt({ each: true })
  tagsIds: number[];

  @ApiProperty({
    example: 10,
    description: 'minutes to read post',
    required: true,
    type: 'integer',
  })
  @IsInt()
  minutes_to_read: number;

  @ApiProperty({
    example: 1,
    description: 'post body',
    required: true,
    type: 'string',
  })
  @IsString()
  body: string;
}
