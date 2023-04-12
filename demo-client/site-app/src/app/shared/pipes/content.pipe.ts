import { Pipe, PipeTransform } from '@angular/core';
import { IContentsAbstract } from '../interfaces/contents-abstract.interface';
import { TranslocoService } from '@ngneat/transloco';

export interface IContent extends IContentsAbstract {
  Title: string;
  Contents: IContentsAbstract[];
}

@Pipe({
  name: 'content',
})
export class ContentPipe implements PipeTransform {
  localDefaultLang = localStorage.getItem('defaultLanguage');
  appDefaultLanguage = 'az';
  defaultLanguage = 'az';

  constructor(private translationService: TranslocoService) {
    this.appDefaultLanguage = this.translationService.getDefaultLang();

    if (!this.localDefaultLang) {
      localStorage.setItem('defaultLanguage', this.appDefaultLanguage);
    }

    if (
      this.localDefaultLang &&
      this.localDefaultLang !== this.appDefaultLanguage
    ) {
      this.translationService.setActiveLang(this.localDefaultLang);
      this.defaultLanguage = this.localDefaultLang;
    }
  }

  transform(
    contents: any[],
    type:
      | 'title'
      | 'description'
      | 'position'
      | 'address'
      | 'contactDetail' = 'title'
  ): string {
    const content = contents.filter(
      (c) => c.Language === this.defaultLanguage
    )[0];

    switch (type) {
      case 'title':
        return content['Title'];
        break;
      case 'description':
        return content['Description'];
        break;
      case 'position':
        return content['Position'];
        break;
      case 'address':
        return content['Address'];
        break;
      case 'contactDetail':
        return content['ContactDetail'];
        break;
      default:
        return content['Title'];
        break;
    }
  }
}
