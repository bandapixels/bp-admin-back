import { Connection } from 'typeorm';
import { AdminTag } from './entity/admin.tag.entity';

export const adminTagProviders = [
  {
    provide: 'ADMIN_TAG_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(AdminTag),
    inject: ['DATABASE_CONNECTION'],
  },
];
