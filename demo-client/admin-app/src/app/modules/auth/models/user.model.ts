import Claim from '../enums/claims/claim.type';
import ERole from '../enums/role.enum';

export interface UserModel {
  UserId: number | undefined;
  Email: string | undefined;
  Name: string | undefined;
  Surname: string | undefined;
  Position: string | undefined;
  Role: ERole | undefined;
  Claims: Claim[] | undefined;
}
