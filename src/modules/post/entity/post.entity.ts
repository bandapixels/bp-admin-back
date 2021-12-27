import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
} from 'typeorm';

import { Tag } from '../../tag/entity/admin.tag.entity';
import { BaseMysqlModel } from '../../../common/db/base-mysql.model';
import { File } from '../../files/entity/file.entity';

@Entity()
export class Post extends BaseMysqlModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  head!: string;

  @Column({ default: 0 })
  views: number;

  @Column({ default: false })
  public: boolean;

  @Column()
  subtitle: string;

  @Column()
  excerpt: string;

  @Column({ nullable: true, default: null })
  image: string;

  @Column({ nullable: true, default: null })
  preview_image: string;

  @Column()
  minutes_to_read: number;

  @Column({ type: 'longtext' })
  body: string;

  @Column({ default: null })
  url: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  publishedAt: Date | null;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @ManyToMany(() => Tag, { cascade: true })
  @JoinTable()
  tags?: Tag[];
}
