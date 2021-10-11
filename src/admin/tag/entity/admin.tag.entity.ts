import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AdminTag {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
}
