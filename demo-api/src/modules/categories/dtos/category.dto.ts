import { DetailDto } from '@api-common/dto/detail.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryContent } from './category-content.dto';

export class Category extends DetailDto {
  @ApiProperty({ type: CategoryContent, isArray: true })
  Contents: CategoryContent[];
}
