import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export abstract class ShortDetailDto {
  @ApiPropertyOptional()
  @IsOptional()
  Id: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  LastUpdateDate?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDateString()
  CreatedDate?: string;
}
