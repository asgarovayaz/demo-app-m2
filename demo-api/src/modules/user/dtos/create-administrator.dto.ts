import { IsEmail, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CreateDetailDto } from '@api-common/dto/create-detail.dto';
export class CreateAdministratorDto extends CreateDetailDto {
  @ApiProperty()
  @IsString()
  @MaxLength(255)
  Name: string;

  @ApiProperty()
  @IsString()
  @MaxLength(255)
  Surname: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(255)
  Email: string;
}
