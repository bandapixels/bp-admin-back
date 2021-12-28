import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseMysqlModel } from '../../../common/db/base-mysql.model';

@Entity()
export class Tags extends BaseMysqlModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
