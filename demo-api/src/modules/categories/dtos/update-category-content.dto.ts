import { UpdateContentDetailDto } from '@api-common/dto/update-content-detail.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCategoryContent extends UpdateContentDetailDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MinLength(2)
  Title: string;
}
