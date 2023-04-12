import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsUUID('all')
  UserId: number;

  @ApiProperty()
  @IsString()
  OldPassword: string;

  @ApiProperty()
  @IsString()
  NewPassword: string;

  @ApiProperty()
  @IsString()
  NewRePassword: string;
}
