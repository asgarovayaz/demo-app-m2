import { IShortCategories } from '@demo-user/shared/interfaces/short-categories.interface';
import { IPostsShortContents } from './posts-short-contents.interface';
import { IShortAbstract } from '@demo-user/shared/interfaces/short-abstract.interface';

export interface IShortPosts extends IShortAbstract {
  Category: IShortCategories;
  Contents: IPostsShortContents[];
}
