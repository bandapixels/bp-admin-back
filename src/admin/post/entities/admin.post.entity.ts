import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Tag } from '../../tag/entity/admin.tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  head: string;
  @Column()
  views: number;
  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];
  @Column()
  public: boolean;
}
