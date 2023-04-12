import { CategoryMapping } from '@modules/categories/category.mapping';
import { Post } from './dtos/post.dto';
import { ShortPost } from './dtos/short-post.dto';
import { PostContentEntity } from './entities/post-content.entity';
import { PostEntity } from './entities/post.entity';
import * as moment from 'moment';
import { PostContent } from './dtos/post-content.dto';
import { PostShortContent } from './dtos/post-short-content.dto';

export class PostMapping {
  categoryMap = new CategoryMapping();

  public one(entity: PostEntity): Post {
    const news: Post = {
      Contents: [],
      Id: null,
      Status: null,
      CreatedBy: null,
      CreatedDate: undefined,
      LastUpdateBy: null,
      LastUpdateDate: undefined,
      CategoryId: null,
    };

    for (const key in news) {
      if (Object.prototype.hasOwnProperty.call(entity, key)) {
        switch (key) {
          case 'Contents':
            news[key] = this.contentMany(entity[key]);
            break;
          case 'CreatedDate':
          case 'LastUpdateDate':
            if (entity[key])
              news[key] = moment(entity[key]).format('DD-MM-YYYY HH:mm');
            break;
          default:
            news[key] = entity[key];
            break;
        }
      }
    }
    return news;
  }

  public shortOne(entity: PostEntity, isPaged = false): ShortPost {
    const news: ShortPost = {
      Contents: [],
      Id: null,
      Category: null,
      CreatedDate: null,
    };

    for (const key in news) {
      if (Object.prototype.hasOwnProperty.call(entity, key)) {
        switch (key) {
          case 'Contents':
            news[key] = this.contentShortMany(entity[key], isPaged);
            break;
          case 'Category':
            news.Category = this.categoryMap.shortOne(entity.Category);
            break;
          case 'CreatedDate':
          case 'LastUpdateDate':
            if (entity[key])
              news[key] = moment(entity[key]).format('DD.MM.YYYY');
            break;
          default:
            news[key] = entity[key];
            break;
        }
      }
    }
    return news;
  }

  public contentOne(entity: PostContentEntity): PostContent {
    const content: PostContent = {
      Title: null,
      Description: null,
      Id: null,
      Language: null,
    };
    for (const key in content) {
      if (Object.prototype.hasOwnProperty.call(entity, key)) {
        switch (key) {
          default:
            content[key] = entity[key];
            break;
        }
      }
    }
    return content;
  }

  public contentShortOne(
    entity: PostContentEntity,
    isPaged = false,
  ): PostShortContent {
    const content: PostShortContent = {
      Title: null,
      Description: null,
      Id: null,
      Language: null,
    };
    for (const key in content) {
      if (Object.prototype.hasOwnProperty.call(entity, key)) {
        switch (key) {
          case 'Description':
            if (isPaged) content[key] = entity[key];
            break;
          default:
            content[key] = entity[key];
            break;
        }
      }
    }
    return content;
  }

  public contentMany(entities: PostContentEntity[]): PostContent[] {
    return entities.map((entity) => this.contentOne(entity));
  }

  public contentShortMany(
    entities: PostContentEntity[],
    isPaged = false,
  ): PostShortContent[] {
    return entities.map((entity) => this.contentShortOne(entity, isPaged));
  }

  public many(entities: PostEntity[]): Post[] {
    return entities.map((entity) => this.one(entity));
  }

  public shortMany(entities: PostEntity[], isPaged = false): ShortPost[] {
    return entities.map((entity) => this.shortOne(entity, isPaged));
  }
}
