import { Pipe, PipeTransform } from '@angular/core';
import { EStatus } from '../enums/status.enum';

@Pipe({
  name: 'status',
})
export class StatusPipe implements PipeTransform {
  transform(status: EStatus): string {
    const translates = {
      Draft: 'Draft',
      Active: 'Active',
      Inactive: 'Inactive',
    };
    return translates[status];
  }
}
