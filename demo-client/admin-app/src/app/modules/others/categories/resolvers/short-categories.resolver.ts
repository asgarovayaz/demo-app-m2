import { Injectable } from '@angular/core';
import {
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable} from 'rxjs';
import { CategoriesService } from '../categories.service';
import { ICategories } from '../models/categories.interface';

@Injectable({
  providedIn: 'root',
})
export class ShortCategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ICategories> {
    return this.categoriesService.getShortAll();
  }
}
