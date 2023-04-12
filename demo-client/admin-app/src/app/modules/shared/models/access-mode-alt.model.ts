import { AccessModeEnum } from "../enums/access-mode-enum";
import { AccessModeModuleEnum } from "../enums/access-mode-module.enum";
import { AccessModeSubModuleEnum } from "../enums/access-mode-sub-module.enum";

export interface IAccessModeAlt {
  AccessMode: AccessModeEnum;
  ModuleId: number | undefined;
  Module: AccessModeModuleEnum;
  SubModule: AccessModeSubModuleEnum;
  SubModuleAccessMode: AccessModeEnum;
  SubModuleId: number | undefined;
}
