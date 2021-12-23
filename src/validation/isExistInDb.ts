import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getConnection } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsExistInDbConstraint implements ValidatorConstraintInterface {
  async validate(
    value: string,
    { constraints, property }: ValidationArguments,
  ): Promise<boolean> {
    const [entity] = constraints;

    return !!(await getConnection()
      .getRepository(entity)
      .count({
        where: {
          [property]: value,
        },
      }));
  }

  defaultMessage({
    constraints,
    property,
    value,
  }: ValidationArguments): string {
    const [entity] = constraints;

    return `${entity} with ${property} ${value} was not found`;
  }
}

export function IsExistInDb(entity: string, options?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options,
      constraints: [entity],
      validator: IsExistInDbConstraint,
    });
  };
}
