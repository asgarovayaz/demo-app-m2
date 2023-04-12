import { ICreateAbstract } from '@demo-admin/shared/interfaces/create-abstract.interface';
import { ICreatePostsContents } from './create-posts-contents.interface';

export interface ICreatePosts extends ICreateAbstract {
  CategoryId: number | undefined;
  Contents: ICreatePostsContents[];
}
