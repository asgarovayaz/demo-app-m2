import Claim from '@api-common/claims/claim.type';
import { DetailEntity } from '@api-common/entity/detail.entity';
import ERole from '@api-common/enums/role.enum';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity extends DetailEntity {
  @Column({ type: 'varchar', length: 255 })
  Name: string;

  @Column({ type: 'varchar', length: 255 })
  Surname: string;

  @Column({ type: 'varchar', length: 255 })
  Position: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  Email: string;

  @Column({ type: 'varchar', length: 255 })
  Passcode: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  HashedRefreshToken: string;

  @Column({ type: 'enum', enum: ERole, default: ERole.Admin })
  Role: ERole;

  @Column({
    type: 'enum',
    enum: Claim,
    array: true,
    default: [],
  })
  Claims: Claim[];

  @Column({ default: null })
  IsInResetMode: boolean;

  @Column({ type: 'varchar', length: 255, default: null })
  ActivationCode: string;
}
