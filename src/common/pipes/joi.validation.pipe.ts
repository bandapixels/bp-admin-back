import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema, options } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'body') {
      const data = this.schema.validate(value, {
        abortEarly: false,
      });
      if (data.error) {
        throw new BadRequestException(data.error.details);
      }
    }
    return value;
  }
}
