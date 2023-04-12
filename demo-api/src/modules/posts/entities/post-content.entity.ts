import { ContentDetailEntity } from '@api-common/entity/content-detail.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { PostEntity } from './post.entity';

@Entity({
  name: 'post-contents',
})
export class PostContentEntity extends ContentDetailEntity {
  @Column({ type: 'varchar', nullable: true })
  Title: string;

  @Column({ type: 'text', nullable: true })
  Description: string;

  @ManyToOne(() => PostEntity, (entity) => entity.Contents)
  Post: PostEntity;
}
