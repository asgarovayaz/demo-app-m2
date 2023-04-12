import { IAbstract } from '@demo-admin/shared/interfaces/abstract.interface';
import { IPostsContents } from './posts-contents.interface';

export interface IShortPosts extends IAbstract {
  Contents: IPostsContents[];
}
