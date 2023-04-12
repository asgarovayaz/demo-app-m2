import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID } from 'class-validator';

export class ProfileDto {
  @ApiProperty()
  @IsUUID('all')
  UserId: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Surname: string;
}
