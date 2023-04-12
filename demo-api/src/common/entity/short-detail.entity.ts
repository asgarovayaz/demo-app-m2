import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class ShortDetailEntity {
  @PrimaryGeneratedColumn()
  Id: number;
}
