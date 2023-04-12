import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ICategories } from '../../others/categories/models/categories.interface';
import { ELanguage } from '../enums/language.enum';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  constructor(private activatedRoute: ActivatedRoute) {}
  transform(categoryId: number): ICategories {
    const categories: any[] = this.activatedRoute.parent?.snapshot.data['shortCategories'];

    return categories.filter((category) => category.Id === categoryId)[0];
  }
}
