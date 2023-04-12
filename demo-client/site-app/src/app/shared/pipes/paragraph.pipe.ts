import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'paragraph',
})
export class ParagraphPipe implements PipeTransform {
  transform(content: string): string {
    const result = new RegExp('<p>(.*?)</p>').exec(content);
    return result ? result?.[0] : '';
  }
}
