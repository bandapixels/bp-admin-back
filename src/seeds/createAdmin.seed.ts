import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { Users } from '../modules/users/entity/users.entity';

export default class CreateAdminSeed implements Seeder {
  async run(factory: Factory, _connection: Connection): Promise<void> {
    await factory(Users)().create();
  }
}
