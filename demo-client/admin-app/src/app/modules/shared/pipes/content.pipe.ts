import { Pipe, PipeTransform } from '@angular/core';
import { IContentsAbstract } from '../interfaces/contents-abstract.interface';

export interface IContent extends IContentsAbstract {
  Title: string;
  Contents: IContentsAbstract[];
}

@Pipe({
  name: 'content',
})
export class ContentPipe implements PipeTransform {
  transform(contents: any[]): string {
    const content = contents.filter((c) => c.Language === 'az')[0];
    return content['Title'];
  }
}
