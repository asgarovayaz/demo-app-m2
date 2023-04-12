import { ShortDetailDto } from '@api-common/dto/detail-short.dto';
import { ApiProperty } from '@nestjs/swagger';
import { CategoryShortContent } from './category-short-content.dto';

export class ShortCategory extends ShortDetailDto {
  @ApiProperty({ type: CategoryShortContent, isArray: true })
  Contents: CategoryShortContent[];
}
