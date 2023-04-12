import { EStatus } from '@api-common/enums';
import { Paginate } from '@api-common/interfaces/paginate.interface';
import { AuthenticatedUserDto } from '@modules/auth/dtos/authenticated-user.dto';
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePost } from './dtos/create-post.dto';
import { Post } from './dtos/post.dto';
import { ShortPost } from './dtos/short-post.dto';
import { UpdatePost } from './dtos/update-post.dto';
import { PostContentEntity } from './entities/post-content.entity';
import { PostEntity } from './entities/post.entity';
import { CategoryService } from '@modules/categories/category.service';
import { CreatePostContent } from './dtos/create-post-content.dto';
import { UpdatePostContent } from './dtos/update-post-content.dto';
import { PostMapping } from './post.mapping';

@Injectable()
export class PostService {
  mapTo = new PostMapping();

  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    @InjectRepository(PostContentEntity)
    private postContentsRepository: Repository<PostContentEntity>,
    @Inject(forwardRef(() => CategoryService))
    private categoryService: CategoryService,
  ) {}

  async getPaged(
    limit: number,
    page: number,
    category: number,
  ): Promise<Paginate<Post[]>> {
    const data = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.Contents', 'contents')
      .leftJoinAndSelect('post.Category', 'category')
      .leftJoinAndSelect('category.Contents', 'category_contents')
      .where('post.IsDeleted = :isDeleted', { isDeleted: false });

    page = page === 1 ? 0 : page - 1;

    data.orderBy(`post.CreatedDate`, 'DESC');

    if (category) {
      data.andWhere('category.Id :category', { category });
    }

    data.take(limit).skip(page * limit);

    const collectionSize = await data.getCount();

    const getMany = await data.getMany();

    const postData = this.mapTo.many(getMany);

    const result: Paginate<Post[]> = {
      collectionSize,
      pageSize: limit,
      page: page + 1,
      data: postData,
    };

    return result;
  }

  async getShortPaged(
    limit: number,
    page: number,
    category: number,
  ): Promise<Paginate<ShortPost[]>> {
    try {
      const data = this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.Contents', 'contents')
        .leftJoinAndSelect('post.Category', 'category')
        .leftJoinAndSelect('category.Contents', 'category_contents')
        .where('post.IsDeleted = :isDeleted AND post.Status = :status', {
          isDeleted: false,
          status: EStatus.Active,
        });

      page = page === 1 ? 0 : page - 1;

      if (category) {
        data.andWhere('category.Id :category', { category });
      }

      data.take(limit).skip(page * limit);

      const collectionSize = await data.getCount();

      const getMany = await data.getMany();

      const postData = this.mapTo.shortMany(getMany);

      const result: Paginate<ShortPost[]> = {
        collectionSize,
        pageSize: limit,
        page: page + 1,
        data: postData,
      };

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getData(itemId: number): Promise<Post> {
    try {
      const data = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.Contents', 'contents')
        .leftJoinAndSelect('post.Category', 'category')
        .leftJoinAndSelect('category.Contents', 'category_contents')
        .where('post.IsDeleted = :isDeleted AND post.Id = :itemId', {
          isDeleted: false,
          itemId,
        })
        .getOne();

      const result = this.mapTo.one(data);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getShortData(itemId: number): Promise<ShortPost> {
    try {
      const data = await this.postRepository
        .createQueryBuilder('post')
        .leftJoinAndSelect('post.Contents', 'contents')
        .leftJoinAndSelect('post.Category', 'category')
        .leftJoinAndSelect('category.Contents', 'category_contents')
        .where('post.IsDeleted = :isDeleted AND post.Id = :itemId', {
          isDeleted: false,
          itemId,
        })
        .getOne();

      const result = this.mapTo.shortOne(data, true);

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(create: CreatePost, user: AuthenticatedUserDto): Promise<Post> {
    try {
      const data = new PostEntity();

      for (const key in create) {
        const element = create[key];

        switch (key) {
          case 'CategoryId':
            if (element) {
              const category = await this.categoryService.getOneRaw(element);
              data.Category = category;
            }
            break;
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

      const save = await this.postRepository.save(data);

      const result = this.mapTo.one(save);

      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(update: UpdatePost, user: AuthenticatedUserDto): Promise<Post> {
    const data = await this.postRepository.findOne({
      where: {
        Id: update.Id,
      },
    });

    for (const key in update) {
      const element = update[key];

      switch (key) {
        case 'CategoryId':
          if (element) {
            const category = await this.categoryService.getOneRaw(element);
            data.Category = category;
          }
          break;
        case 'Contents':
          await this.createContentMany(update.Contents);
          break;
        default:
          data[key] = element;
          break;
      }
    }

    data.LastUpdateBy = `${user.Name} ${user.Surname}`;

    const save = await this.postRepository.save(data);
    const result = this.mapTo.one(save);
    return result;
  }

  async createContentOne(
    createContent: CreatePostContent,
  ): Promise<PostContentEntity> {
    const data = new PostContentEntity();

    for (const key in createContent) {
      const element = createContent[key];
      switch (key) {
        default:
          data[key] = element;
          break;
      }
    }
    const save = await this.postContentsRepository.save(data);
    return save;
  }

  async createContentMany(
    createContent: CreatePostContent[],
  ): Promise<PostContentEntity[]> {
    const results: PostContentEntity[] = [];
    for (const content of createContent) {
      const result = await this.createContentOne(content);
      results.push(result);
    }
    return results;
  }

  async updateContentOne(
    updateContent: UpdatePostContent,
  ): Promise<PostContentEntity> {
    const data = await this.postContentsRepository.findOne({
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
    const save = await this.postContentsRepository.save(data);
    return save;
  }

  async updateContentMany(
    updateContents: UpdatePostContent[],
  ): Promise<PostContentEntity[]> {
    const results: PostContentEntity[] = [];
    for (const content of updateContents) {
      const result = await this.updateContentOne(content);
      results.push(result);
    }
    return results;
  }

  async delete(Id: number, user: AuthenticatedUserDto): Promise<boolean> {
    const get = await this.postRepository.findOne({
      where: { IsDeleted: false, Id },
    });

    if (!get) throw new HttpException(`Post not found.`, HttpStatus.NOT_FOUND);

    get.IsDeleted = true;
    get.Status = EStatus.Inactive;
    get.LastUpdateBy = `${user.Name} ${user.Surname}`;

    const save = await this.postRepository.save(get);

    if (save) {
      return true;
    }

    return false;
  }
}
