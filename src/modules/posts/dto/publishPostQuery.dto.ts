import { IsBooleanString } from 'class-validator';

export class PublishPostQueryDto {
  @IsBooleanString()
  publish: string;
}
