import { IUpdateAbstract } from '@demo-admin/shared/interfaces/update-abstract.interface';
import { IUpdatePostsContents } from './update-posts-contents.interface';

export interface IUpdatePosts extends IUpdateAbstract {
  CategoryId?: number;
  Contents?: IUpdatePostsContents[];
}
