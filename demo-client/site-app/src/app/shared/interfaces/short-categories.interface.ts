import { IShortAbstract } from "./short-abstract.interface";
import { IShortCategoriesContents } from "./short-categories-contents.interface";

export interface IShortCategories extends IShortAbstract {
  Contents: IShortCategoriesContents[];
}
