import { ELanguage } from '@api-common/enums/language.enum';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class ContentDetailEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({
    name: 'language',
    type: 'enum',
    enum: ELanguage,
    default: ELanguage.az,
  })
  Language: ELanguage;
}
