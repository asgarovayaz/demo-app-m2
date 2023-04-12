import { EStatus } from '@api-common/enums/status.enum';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class DetailEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({
    name: 'status',
    type: 'enum',
    enum: EStatus,
    default: EStatus.Draft,
  })
  Status: EStatus;

  @Column()
  CreatedBy: string;

  @CreateDateColumn()
  CreatedDate: string;

  @Column({ nullable: true })
  LastUpdateBy: string;

  @UpdateDateColumn()
  LastUpdateDate: string;

  @Column({
    default: false,
  })
  IsDeleted: boolean;
}
