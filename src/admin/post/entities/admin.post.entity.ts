import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Tag } from '../../tag/entity/admin.tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  head!: string;
  @Column({ default: 0 })
  views: number;
  @OneToMany(() => Tag, (tag) => tag.post, { cascade: true })
  tags?: Tag[];
  @Column({ default: false })
  public: boolean;
  @Column()
  subtitle: string;
  @Column()
  excerpt: string;
  @Column()
  image: string;
  @Column()
  preview_image: string;
  @Column()
  mins_to_read: number;
  @Column()
  body: string;
  @Column({ default: null })
  url: string;
  @Column()
  files: string;
}
