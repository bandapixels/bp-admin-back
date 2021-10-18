import { Connection } from 'typeorm';
import { Post } from './entities/admin.post.entity';

export const adminPostProviders = [
  {
    provide: 'ADMIN_POST_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Post),
    inject: ['DATABASE_CONNECTION'],
  },
];
