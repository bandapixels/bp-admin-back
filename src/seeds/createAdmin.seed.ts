import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { User } from '../modules/user/user.entity';

export default class CreateAdminSeed implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(User)().create();
  }
}
