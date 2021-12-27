import { BaseMysqlModel } from '../../../common/db/base-mysql.model';
import { Column, Entity } from 'typeorm';

@Entity()
export class File extends BaseMysqlModel {
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
}
