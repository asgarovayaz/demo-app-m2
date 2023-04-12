import * as moment from 'moment';
import { CategoryContent } from './dtos/category-content.dto';
import { CategoryShortContent } from './dtos/category-short-content.dto';
import { Category } from './dtos/category.dto';
import { ShortCategory } from './dtos/short-category.dto';
import { CategoryContentEntity } from './entities/category-content.entity';
import { CategoryEntity } from './entities/category.entity';

export class CategoryMapping {
  public one(entity: CategoryEntity): Category {
    const category: Category = {
      Contents: [],
      Id: null,
      Status: null,
      CreatedBy: null,
      CreatedDate: undefined,
      LastUpdateBy: null,
      LastUpdateDate: undefined,
    };

    for (const key in category) {
      if (Object.prototype.hasOwnProperty.call(entity, key)) {
        switch (key) {
          case 'Contents':
            category[key] = this.contentMany(entity[key]);
            break;
          case 'CreatedDate':
          case 'LastUpdateDate':
            if (entity[key])
              category[key] = moment(entity[key]).format('DD-MM-YYYY HH:mm');
            break;
          default:
            category[key] = entity[key];
            break;
        }
      }
    }
    return category;
  }

  public shortOne(entity: CategoryEntity): ShortCategory {
    const category: ShortCategory = {
      Contents: [],
      Id: null,
    };

    for (const key in category) {
      if (Object.prototype.hasOwnProperty.call(entity, key)) {
        switch (key) {
          case 'Content':
            category[key] = this.contentShortMany(entity[key]);
            break;
          default:
            category[key] = entity[key];
            break;
        }
      }
    }
    return category;
  }

  public contentOne(entity: CategoryContentEntity): CategoryContent {
    const content: CategoryContent = {
      Title: null,
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

  public contentShortOne(entity: CategoryContentEntity): CategoryShortContent {
    const content: CategoryShortContent = {
      Title: null,
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

  public contentMany(entities: CategoryContentEntity[]): CategoryContent[] {
    return entities.map((entity) => this.contentOne(entity));
  }

  public contentShortMany(
    entities: CategoryContentEntity[],
  ): CategoryShortContent[] {
    return entities.map((entity) => this.contentShortOne(entity));
  }

  public many(entities: CategoryEntity[]): Category[] {
    return entities.map((entity) => this.one(entity));
  }

  public shortMany(entities: CategoryEntity[]): ShortCategory[] {
    return entities.map((entity) => this.shortOne(entity));
  }
}
