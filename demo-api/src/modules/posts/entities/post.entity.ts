import { DetailEntity } from '@api-common/entity/detail.entity';
import { CategoryEntity } from '@modules/categories/entities/category.entity';
import { Entity, OneToMany, ManyToOne, RelationId } from 'typeorm';
import { PostContentEntity } from './post-content.entity';

@Entity({
  name: 'posts',
})
export class PostEntity extends DetailEntity {
  @OneToMany(() => PostContentEntity, (entity) => entity.Post)
  Contents: PostContentEntity[];

  @ManyToOne(() => CategoryEntity, (entity) => entity.Post)
  Category: CategoryEntity;

  @RelationId((entity: PostEntity) => entity.Category)
  CategoryId: number;
}
