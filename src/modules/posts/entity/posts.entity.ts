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

  @Column({
    unique: true,
    nullable: false,
  })
  slug: string;

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
    return `${process.env.CLIENT_URL}/blog/${this.slug}`;
  }

  private getFileUrl(fileType: 'IMAGE' | 'PREVIEW') {
    const files = this.files;

    const fileWithType = files?.filter((file) => file.type === fileType)[0];

    const baseUrl = `${process.env.API_URL}/api/admin/files`;

    return `${baseUrl}/${fileWithType?.id}`;
  }

  @Expose({
    name: 'images',
    groups: ['full'],
  })
  images(): { previewImage: string; image: string } {
    const previewImage = this.getFileUrl('PREVIEW');
    const image = this.getFileUrl('IMAGE');

    return {
      previewImage,
      image,
    };
  }

  @Expose({
    name: 'image',
    groups: ['single'],
  })
  image(): string {
    return this.getFileUrl('IMAGE');
  }

  @Expose({
    name: 'preview_image',
    groups: ['single'],
  })
  preview_image(): string {
    return this.getFileUrl('PREVIEW');
  }
}
