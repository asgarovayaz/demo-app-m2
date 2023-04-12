import { EStatus } from '@api-common/enums';
import { Paginate } from '@api-common/interfaces/paginate.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryMapping } from './category.mapping';
import { Category } from './dtos/category.dto';
import { CreateCategoryContent } from './dtos/create-category-content.dto';
import { CreateCategory } from './dtos/create-category.dto';
import { ShortCategory } from './dtos/short-category.dto';
import { UpdateCategoryContent } from './dtos/update-category-content.dto';
import { UpdateCategory } from './dtos/update-category.dto';
import { CategoryContentEntity } from './entities/category-content.entity';
import { CategoryEntity } from './entities/category.entity';
import { AuthenticatedUserDto } from '@modules/auth/dtos/authenticated-user.dto';

@Injectable()
export class CategoryService {
  mapTo = new CategoryMapping();

  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
    @InjectRepository(CategoryContentEntity)
    private categoryContentRepository: Repository<CategoryContentEntity>,
  ) {}

  async getPaged(limit: number, page: number): Promise<Paginate<Category[]>> {
    try {
      const data = this.categoryRepository
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.Contents', 'contents')
        .where('category.IsDeleted = :isDeleted', { isDeleted: false });

      page = page === 1 ? 0 : page - 1;

      data.orderBy(`category.CreatedDate`, 'DESC');

      const collectionSize = await data.getCount();

      const getMany = await data
        .take(limit)
        .skip(page * limit)
        .getMany();

      const categoryData = this.mapTo.many(getMany);

      const result: Paginate<Category[]> = {
        collectionSize,
        pageSize: limit,
        page: page + 1,
        data: categoryData,
      };

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getShort(): Promise<ShortCategory[]> {
    const data = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.Contents', 'contents')
      .where('category.IsDeleted = :isDeleted AND category.Status = :status', {
        isDeleted: false,
        status: EStatus.Active,
      });

    try {
      const getMany = await data
        .orderBy(`category.CreatedDate`, 'DESC')
        .getMany();

      const categoryData = this.mapTo.shortMany(getMany);

      return categoryData;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getData(itemId: number): Promise<Category> {
    try {
      const data = await this.categoryRepository
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.Contents', 'contents')
        .where('category.IsDeleted = :isDeleted AND category.Id = :itemId', {
          isDeleted: false,
          itemId,
        })
        .getOne();

      const result = new CategoryMapping().one(data);

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getShortData(itemId: number): Promise<ShortCategory> {
    try {
      const data = await this.categoryRepository
        .createQueryBuilder('category')
        .leftJoinAndSelect('category.Contents', 'contents')
        .where('category.IsDeleted = :isDeleted AND category.Id = :itemId', {
          isDeleted: false,
          itemId,
        })
        .getOne();

      const result = new CategoryMapping().shortOne(data);

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(
    create: CreateCategory,
    user: AuthenticatedUserDto,
  ): Promise<Category> {
    try {
      const data = new CategoryEntity();

      for (const key in create) {
        const element = create[key];

        switch (key) {
          case 'Contents':
            const contents = await this.createContentMany(create.Contents);
            data.Contents = contents;
            break;
          default:
            data[key] = element;
            break;
        }
      }
      data.CreatedBy = `${user.Name} ${user.Surname}`;

      const save = await this.categoryRepository.save(data);

      const result = this.mapTo.one(save);

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(
    update: UpdateCategory,
    user: AuthenticatedUserDto,
  ): Promise<Category> {
    try {
      const data = await this.categoryRepository.findOne({
        where: {
          Id: update.Id,
        },
      });

      for (const key in update) {
        const element = update[key];

        switch (key) {
          case 'Contents':
            await this.updateContentMany(update.Contents);
            break;
          default:
            data[key] = element;
            break;
        }
      }

      data.LastUpdateBy = `${user.Name} ${user.Surname}`;

      const save = await this.categoryRepository.save(data);
      const result = new CategoryMapping().one(save);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createContentOne(
    createContent: CreateCategoryContent,
  ): Promise<CategoryContentEntity> {
    try {
      const data = new CategoryContentEntity();

      for (const key in createContent) {
        const element = createContent[key];
        switch (key) {
          default:
            data[key] = element;
            break;
        }
      }
      const save = await this.categoryContentRepository.save(data);
      return save;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async createContentMany(
    createContent: CreateCategoryContent[],
  ): Promise<CategoryContentEntity[]> {
    const results: CategoryContentEntity[] = [];
    for (const content of createContent) {
      const result = await this.createContentOne(content);
      results.push(result);
    }
    return results;
  }

  async updateContentOne(
    updateContent: UpdateCategoryContent,
  ): Promise<CategoryContentEntity> {
    try {
      const data = await this.categoryContentRepository.findOne({
        where: {
          Id: updateContent.Id,
        },
      });

      for (const key in updateContent) {
        const element = updateContent[key];
        switch (key) {
          default:
            data[key] = element;
            break;
        }
      }
      const save = await this.categoryContentRepository.save(data);
      return save;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateContentMany(
    updateContent: UpdateCategoryContent[],
  ): Promise<CategoryContentEntity[]> {
    try {
      const results: CategoryContentEntity[] = [];
      for (const content of updateContent) {
        const result = await this.updateContentOne(content);
        results.push(result);
      }
      return results;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(Id: number, user: AuthenticatedUserDto): Promise<boolean> {
    try {
      const get = await this.categoryRepository.findOne({
        where: { IsDeleted: false, Id },
      });

      if (!get)
        throw new HttpException(`Category not found.`, HttpStatus.NOT_FOUND);

      get.IsDeleted = true;
      get.Status = EStatus.Inactive;
      get.LastUpdateBy = `${user.Name} ${user.Surname}`;

      const save = await this.categoryRepository.save(get);

      if (save) return true;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getOneRaw(itemId: number): Promise<CategoryEntity> {
    return await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.Contents', 'contents')
      .where('category.IsDeleted = :isDeleted AND category.Id = :itemId', {
        isDeleted: false,
        itemId,
      })
      .getOne();
  }
}
