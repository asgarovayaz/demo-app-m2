import { EStatus } from "../enums/status.enum";

export interface IAbstract {
  Id: number;
  Status: EStatus;
  CreatedDate: string;
  CreatedBy: string;
  LastUpdateDate: string;
  LastUpdateBy: string;
}
