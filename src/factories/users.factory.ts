import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { User } from '../modules/auth/entity/user.entity';
import { Role } from '../common/constants/role';
import { hash } from '../modules/auth/helpers/bcrypt';

define(User, (faker: Faker.FakerStatic, context): Partial<User> => {
  const user: Partial<User> = new User();

  user.email = 'bandapixels@bandapixels.com';
  user.name = faker.name.firstName();
  user.password = hash('Secret1!');
  user.role = Role.ADMIN;

  return user;
});
