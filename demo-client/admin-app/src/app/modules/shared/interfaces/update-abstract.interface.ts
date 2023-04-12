import { EStatus } from "../enums/status.enum";

export interface IUpdateAbstract {
  Id: number;
  Status: EStatus | string;
}
