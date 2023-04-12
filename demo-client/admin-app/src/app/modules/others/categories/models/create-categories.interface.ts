import { ICreateAbstract } from "@demo-admin/shared/interfaces/create-abstract.interface";
import { ICreateCategoriesContents } from "./create-categories-contents.interface";

export interface ICreateCategories extends ICreateAbstract {
  Contents: ICreateCategoriesContents[];
}
