import { IsEnum, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ELanguage } from '@api-common/enums/language.enum';

export abstract class ContentDetailDto {
  @ApiPropertyOptional()
  @IsOptional()
  Id: number;

  @ApiProperty({ enum: ELanguage })
  @IsEnum(ELanguage, { each: true })
  Language: ELanguage;
}
