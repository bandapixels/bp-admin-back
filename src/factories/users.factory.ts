import { define } from 'typeorm-seeding';

import { Role } from '../common/constants/role';
import { hash } from '../modules/auth/helpers/bcrypt';
import { Users } from '../modules/users/entity/users.entity';

define(Users, (faker: Faker.FakerStatic, _context): Partial<Users> => {
  const user: Partial<Users> = new Users();

  user.email = 'bandapixels@bandapixels.com';
  user.name = faker.name.firstName();
  user.password = hash('Secret1!');
  user.role = Role.ADMIN;

  return user;
});
