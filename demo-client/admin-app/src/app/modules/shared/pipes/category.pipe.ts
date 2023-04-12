import { ActivatedRoute } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { ICategories } from '../../others/categories/models/categories.interface';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  constructor(private activatedRoute: ActivatedRoute) {}
  transform(categoryId: number): string {
    const categories: ICategories[] = this.activatedRoute.parent?.snapshot.data['shortCategories'];
    const ret = categories.filter((t) => t.Id === categoryId)[0].Contents[0].Title;
    return ret;
  }
}
