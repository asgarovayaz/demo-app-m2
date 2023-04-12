import { IsEmail, IsEnum, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import ERole from '@api-common/enums/role.enum';
import Claim from '@api-common/claims/claim.type';
export class AuthenticatedUserDto {
  @ApiPropertyOptional()
  @IsString()
  UserId?: number;

  @ApiProperty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  @IsString()
  Name: string;

  @ApiProperty()
  @IsString()
  Surname: string;

  @ApiProperty()
  @IsEnum(ERole, { each: true })
  Role: ERole;

  @ApiProperty()
  @IsEnum(Claim, { each: true })
  Claims: Claim[];
}
