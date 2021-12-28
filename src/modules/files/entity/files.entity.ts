import { BaseMysqlModel } from '../../../common/db/base-mysql.model';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Posts } from '../../posts/entity/posts.entity';

@Entity()
export class Files extends BaseMysqlModel {
  @Column({ type: 'varchar', unique: true })
  s3Path: string;

  @Column({ type: 'varchar' })
  fileName: string;

  @Column({ type: 'integer' })
  size: number;

  @Column({ type: 'varchar' })
  mimeType: string;

  @Column({ type: 'enum', enum: ['IMAGE', 'PREVIEW'], default: 'IMAGE' })
  type: 'IMAGE' | 'PREVIEW';

  @ManyToOne(() => Posts, (post) => post.files)
  post: Posts;
}
