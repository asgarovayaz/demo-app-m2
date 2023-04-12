import { ICategoriesContents } from './categories-contents.interface';
import { IAbstract } from "@demo-admin/shared/interfaces/abstract.interface";

export interface ICategories extends IAbstract {
  Contents: ICategoriesContents[];
}
