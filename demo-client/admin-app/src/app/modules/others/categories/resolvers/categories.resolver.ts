import { Injectable } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable} from 'rxjs';
import { CategoriesService } from '../categories.service';
import { IAccessModeAlt } from '@demo-admin/shared/models/access-mode-alt.model';
import { ICategories } from '../models/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ICategories> {
    const accessMode: IAccessModeAlt = route.parent?.data['accessMode'];
    return this.categoriesService.getOne(accessMode.SubModuleId as number);
  }
}
