import { ApiProperty } from '@nestjs/swagger';
import { DetailDto } from '@api-common/dto/detail.dto';
import ERole from '@api-common/enums/role.enum';
import Claim from '@api-common/claims/claim.type';
export class DetailUserDto extends DetailDto {
  @ApiProperty()
  Name: string;

  @ApiProperty()
  Surname: string;

  @ApiProperty()
  Position: string;

  @ApiProperty()
  Email: string;

  @ApiProperty()
  Role: ERole;

  @ApiProperty()
  Claims: Claim[];
}
