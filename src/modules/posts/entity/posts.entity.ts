import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { Tags } from '../../tags/entity/admin.tags.entity';
import { BaseMysqlModel } from '../../../common/db/base-mysql.model';
import { Files } from '../../files/entity/files.entity';

@Entity()
export class Posts extends BaseMysqlModel {
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

  @ManyToMany(() => Tags, { cascade: true })
  @JoinTable()
  tags?: Tags[];

  @OneToMany(() => Files, (file) => file.post)
  @JoinColumn()
  files: Files[];
}
