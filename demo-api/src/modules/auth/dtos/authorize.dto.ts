import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
export class AuthorizeDto {
  @ApiProperty()
  @IsEmail()
  Email: string;

  @ApiProperty()
  @IsString()
  @Length(6, 24)
  Passcode: string;
}
