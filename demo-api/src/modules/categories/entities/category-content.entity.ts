import { ContentDetailEntity } from '@api-common/entity/content-detail.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CategoryEntity } from './category.entity';

@Entity({
  name: 'category_content',
})
export class CategoryContentEntity extends ContentDetailEntity {
  @Column({ type: 'varchar', nullable: true })
  Title: string;

  @ManyToOne(() => CategoryEntity, (entity) => entity.Contents)
  Category: CategoryEntity;
}
