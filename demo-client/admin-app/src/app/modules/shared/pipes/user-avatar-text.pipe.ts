import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userAvatarText'
})
export class UserAvatarTextPipe implements PipeTransform {

  transform(name: string | undefined, surname: string | undefined): string {
    return `${name?.substring(0,1).toUpperCase()}${surname?.substring(0,1).toUpperCase()}`;
  }

}
