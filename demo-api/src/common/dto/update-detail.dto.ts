import { EStatus } from '@api-common/enums/status.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';

export abstract class UpdateDetailDto {
  @ApiProperty()
  @IsNumber()
  Id: number;

  @ApiPropertyOptional({ enum: EStatus })
  @IsOptional()
  Status: EStatus;
}
