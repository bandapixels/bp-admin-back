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
import { Exclude, Expose } from 'class-transformer';

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

  @Column()
  minutes_to_read: number;

  @Column({ type: 'longtext' })
  body: string;

  @Column({ type: 'timestamp', nullable: true, default: null })
  publishedAt: Date | null;

  @Column({ type: 'boolean', default: false })
  published: boolean;

  @Exclude({
    toPlainOnly: true,
  })
  @ManyToMany(() => Tags, (tag) => tag.posts)
  @JoinTable()
  tags?: Tags[];

  @Exclude({
    toPlainOnly: true,
  })
  @OneToMany(() => Files, (file) => file.post)
  @JoinColumn()
  files: Files[];

  @Expose({
    name: 'imageId',
  })
  imageId(): number | null {
    return this.files?.filter((file) => file?.type === 'IMAGE')[0]?.id || null;
  }

  @Expose({
    name: 'previewImageId',
  })
  previewImageId(): number | null {
    return (
      this.files?.filter((file) => file?.type === 'PREVIEW')[0]?.id || null
    );
  }

  @Expose({
    name: 'tagsIds',
  })
  tagsIds(): number[] {
    return this.tags?.map((tag) => tag.id) || [];
  }

  @Expose({
    name: 'url',
  })
  url(): string {
    return `${process.env.API_URL}/api/admin/posts/content/${this.id}`;
  }

  @Expose({
    name: 'images',
  })
  images(): { previewImage: string; image: string } {
    const files = this.files;

    const previewImage = files?.filter((file) => file.type === 'PREVIEW')[0];
    const image = files?.filter((file) => file.type === 'IMAGE')[0];

    const baseUrl = `${process.env.API_URL}/api/admin/files`;

    return {
      previewImage: `${baseUrl}/${previewImage?.id}`,
      image: `${baseUrl}/${image?.id}`,
    };
  }
}
