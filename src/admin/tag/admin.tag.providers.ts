import { Connection } from 'typeorm';
import { Tag } from './entity/admin.tag.entity';

export const adminTagProviders = [
  {
    provide: 'ADMIN_TAG_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Tag),
    inject: ['DATABASE_CONNECTION'],
  },
];
