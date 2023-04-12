import { DetailUserDto } from './dtos/detail-user.dto';
import { UserEntity } from './user.entity';
import * as moment from 'moment';

export class UserMapping {
  public one(entity: UserEntity): DetailUserDto {
    const dto: DetailUserDto = {
      Id: null,
      Email: null,
      Name: null,
      Surname: null,
      Position: null,
      Role: null,
      Claims: [],
      Status: undefined,
      CreatedBy: null,
      CreatedDate: undefined,
    };

    for (const key in dto) {
      if (Object.prototype.hasOwnProperty.call(entity, key)) {
        switch (key) {
          case 'CreatedDate':
          case 'LastUpdateDate':
            if (entity[key])
              dto[key] = moment(entity[key]).format('DD.MM.YYYY');
            break;
          default:
            dto[key] = entity[key];
            break;
        }
      }
    }
    return dto;
  }

  public many(entities: UserEntity[]): DetailUserDto[] {
    return entities.map((entity) => this.one(entity));
  }
}
