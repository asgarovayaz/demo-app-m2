import ERole from '@api-common/enums/role.enum';
import { UserEntity } from '@modules/users/user.entity';
import { AuthenticatedUserDto } from './dtos/authenticated-user.dto';

export class AuthMapping {
  public one(entity: UserEntity): AuthenticatedUserDto {
    const dto: AuthenticatedUserDto = {
      UserId: 0,
      Email: null,
      Name: null,
      Surname: null,
      Role: ERole.User,
      Claims: [],
    };

    for (const key in dto) {
      switch (key) {
        case 'UserId':
          dto.UserId = entity.Id;
          break;
        default:
          dto[key] = entity[key];
          break;
      }
    }
    return dto;
  }
}
