import { CreateDetailDto } from '@api-common/dto/create-detail.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { CreateCategoryContent } from './create-category-content.dto';

export class CreateCategory extends CreateDetailDto {
  @ApiProperty({ type: CreateCategoryContent, isArray: true })
  @IsArray()
  Contents: CreateCategoryContent[];
}
