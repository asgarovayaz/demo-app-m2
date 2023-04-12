import { IUpdateContentAbstract } from "@demo-admin/shared/interfaces/update-contents-abstract.interface";

export interface IUpdatePostsContents extends IUpdateContentAbstract {
  Title?: string;
  Description?: string;
}
