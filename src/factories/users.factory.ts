import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Role } from '../common/constants/role';
import { hash } from '../modules/auth/helpers/bcrypt';
import { User } from '../modules/user/user.entity';

define(User, (faker: Faker.FakerStatic, context): Partial<User> => {
  const user: Partial<User> = new User();

  user.email = 'bandapixels@bandapixels.com';
  user.name = faker.name.firstName();
  user.password = hash('Secret1!');
  user.role = Role.ADMIN;

  return user;
});
