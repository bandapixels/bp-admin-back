import { Entity, Column } from 'typeorm';
import { Role } from '../../common/constants/role';
import { BaseMysqlModel } from '../../common/db/base-mysql.model';

@Entity()
export class User extends BaseMysqlModel {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.ADMIN })
  role: Role;
}
