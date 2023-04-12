import { IsArray, IsEmail, IsEnum, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDetailDto } from '@api-common/dto/create-detail.dto';
import ERole from '@api-common/enums/role.enum';
import Claim from '@api-common/claims/claim.type';
export class CreateUserDto extends CreateDetailDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  Name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  Surname: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  Position: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(255)
  Email: string;

  @ApiProperty()
  @IsEnum(ERole, { each: true })
  Role: ERole;

  @ApiProperty()
  @IsArray()
  Claims: Claim[];
}
