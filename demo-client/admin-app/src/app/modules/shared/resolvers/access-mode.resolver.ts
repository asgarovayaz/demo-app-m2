import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccessModeEnum } from '../enums/access-mode-enum';
import { AccessModeModuleEnum } from '../enums/access-mode-module.enum';
import { AccessModeSubModuleEnum } from '../enums/access-mode-sub-module.enum';
import { IAccessModeAlt } from '../models/access-mode-alt.model';

@Injectable({
  providedIn: 'root',
})
export class AccessModeResolver {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<IAccessModeAlt> {
    const parceUrl = state.url.split('/');
    let ModuleId: number | undefined = undefined;
    let AccessMode: AccessModeEnum = AccessModeEnum.NotSelected;
    let Module: AccessModeModuleEnum = AccessModeModuleEnum.NotSelected;
    let SubModule: AccessModeSubModuleEnum =
      AccessModeSubModuleEnum.NotSelected;
    let SubModuleId: number | undefined = undefined;
    let SubModuleAccessMode: AccessModeEnum = AccessModeEnum.NotSelected;

    switch (parceUrl.length) {
      default:
        if (parceUrl[1]) Module = parceUrl[1] as AccessModeModuleEnum;
        if (parceUrl[2]) SubModule = parceUrl[2] as AccessModeSubModuleEnum;
        if (parceUrl[3]) SubModuleAccessMode = parceUrl[3] as AccessModeEnum;
        if (parceUrl[4]) SubModuleId = Number(parceUrl[4]);
        break;
    }

    const getMode: IAccessModeAlt = {
      AccessMode,
      ModuleId,
      Module,
      SubModule,
      SubModuleAccessMode,
      SubModuleId,
    };

    return of(getMode);
  }
}
