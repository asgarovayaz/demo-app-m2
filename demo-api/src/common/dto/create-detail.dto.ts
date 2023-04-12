import { EStatus } from '@api-common/enums/status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export abstract class CreateDetailDto {
  @ApiProperty({ enum: EStatus })
  @IsEnum(EStatus, { each: true })
  Status: EStatus;
}
