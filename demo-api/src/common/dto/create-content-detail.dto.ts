import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ELanguage } from '@api-common/enums/language.enum';

export abstract class CreateContentDetailDto {
  @ApiProperty({ enum: ELanguage })
  @IsEnum(ELanguage, { each: true })
  Language: ELanguage;
}
