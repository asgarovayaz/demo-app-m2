import { UpdateDetailDto } from '@api-common/dto/update-detail.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { UpdateCategoryContent } from './update-category-content.dto';

export class UpdateCategory extends UpdateDetailDto {
  @ApiPropertyOptional({ type: UpdateCategoryContent, isArray: true })
  @IsOptional()
  @IsArray()
  Contents: UpdateCategoryContent[];
}
