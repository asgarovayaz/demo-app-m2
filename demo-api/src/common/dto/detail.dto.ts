import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EStatus } from '@api-common/enums/status.enum';

export abstract class DetailDto {
  @ApiPropertyOptional()
  @IsOptional()
  Id: number;

  @ApiProperty({ enum: EStatus })
  @IsEnum(EStatus, { each: true })
  Status: EStatus;

  @ApiProperty()
  @IsString()
  CreatedBy: string;

  @ApiProperty()
  @IsDateString()
  CreatedDate: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  LastUpdateBy?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  LastUpdateDate?: string;
}
