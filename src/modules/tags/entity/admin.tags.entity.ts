import { Column, Entity, ManyToMany } from 'typeorm';
import { BaseMysqlModel } from '../../../common/db/base-mysql.model';
import { Posts } from '../../posts/entity/posts.entity';

@Entity()
export class Tags extends BaseMysqlModel {
  @Column()
  name: string;

  @ManyToMany(() => Posts, (post) => post.tags, {
    onDelete: 'CASCADE',
  })
  posts: Posts[];
}
