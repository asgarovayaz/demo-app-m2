import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ELanguage } from '@api-common/enums/language.enum';

export abstract class UpdateContentDetailDto {
  @ApiProperty()
  @IsOptional()
  Id: number;

  @ApiProperty({ enum: ELanguage })
  @IsEnum(ELanguage, { each: true })
  Language: ELanguage;
}
