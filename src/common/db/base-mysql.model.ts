import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class BaseMysqlModel {
  @ApiModelProperty({ readOnly: true })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiModelProperty({ readOnly: true })
  @CreateDateColumn({ nullable: false })
  createdAt: Date;

  @ApiModelProperty({ readOnly: true })
  @UpdateDateColumn({ nullable: false })
  updatedAt: Date;
}
