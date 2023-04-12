import { ICreateContentsAbstract } from '@demo-admin/shared/interfaces/create-contents-abstract.interface';

export interface ICreatePostsContents extends ICreateContentsAbstract {
  Title: string | undefined;
  Description: string | undefined;
}
