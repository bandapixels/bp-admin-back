import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getConnection } from 'typeorm';
import { EntityNames } from '../common/constants/entityNames';

@ValidatorConstraint({ async: true })
export class IsExistInDbConstraint implements ValidatorConstraintInterface {
  async validate(
    value: string,
    { constraints, property }: ValidationArguments,
  ): Promise<boolean> {
    const [entity, overrideProperty] = constraints;

    return !!(await getConnection()
      .getRepository(entity)
      .count({
        where: {
          [overrideProperty || property]: value,
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

export function IsExistInDb(
  entity: EntityNames,
  overrideProperty?: string,
  options?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, property: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: property,
      options,
      constraints: [entity, overrideProperty],
      validator: IsExistInDbConstraint,
    });
  };
}
