import Faker from 'faker';
import { define } from 'typeorm-seeding';

import { User } from '../modules/auth/entity/user.entity';
import { hash } from '../modules/auth/Helpers/hash.password';
import { Role } from '../modules/auth/Models/role.enum';

define(User, (faker: Faker.FakerStatic, context): Partial<User> => {
  const user: Partial<User> = new User();

  user.email = faker.internet.email();
  user.name = faker.name.firstName();
  user.password = hash('secret');
  user.role = Role.ADMIN;

  console.log(user);

  return user;
});
