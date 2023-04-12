import {
  IsArray,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { UpdateDetailDto } from '@api-common/dto/update-detail.dto';
import ERole from '@api-common/enums/role.enum';
import Claim from '@api-common/claims/claim.type';
export class UpdateUserDto extends UpdateDetailDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  Name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  Surname: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(255)
  Position: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  Email: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(ERole, { each: true })
  Role: ERole;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  Claim: Claim[];
}
