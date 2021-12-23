import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseMysqlModel } from '../../../common/db/base-mysql.model';

@Entity()
export class Tag extends BaseMysqlModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
