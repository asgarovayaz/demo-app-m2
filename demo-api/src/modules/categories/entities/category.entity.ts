import { Entity, OneToMany } from 'typeorm';
import { CategoryContentEntity } from '@modules/categories/entities/category-content.entity';
import { DetailEntity } from '@api-common/entity/detail.entity';
import { PostEntity } from '@modules/posts/entities/post.entity';

@Entity({
  name: 'categories',
})
export class CategoryEntity extends DetailEntity {
  @OneToMany(() => CategoryContentEntity, (entity) => entity.Category)
  Contents: CategoryContentEntity[];

  @OneToMany(() => PostEntity, (entity) => entity.Category)
  Post: PostEntity[];
}
