import { ICreateContentsAbstract } from "@demo-admin/shared/interfaces/create-contents-abstract.interface";

export interface ICreateCategoriesContents extends ICreateContentsAbstract {
  Title: string | undefined;
}
