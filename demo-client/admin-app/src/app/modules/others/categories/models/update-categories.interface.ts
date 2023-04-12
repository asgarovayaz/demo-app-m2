import { EColorPalette } from "@demo-admin/shared/enums/color-palette.enum";
import { IUpdateAbstract } from "@demo-admin/shared/interfaces/update-abstract.interface";
import { IUpdateCategoriesContents } from "./update-categories-contents.interface";

export interface IUpdateCategories extends IUpdateAbstract {
  Contents: IUpdateCategoriesContents[];
}
