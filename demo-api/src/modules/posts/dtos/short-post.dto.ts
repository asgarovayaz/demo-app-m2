import { ShortDetailDto } from '@api-common/dto/detail-short.dto';
import { ShortCategory } from '@modules/categories/dtos/short-category.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PostShortContent } from './post-short-content.dto';

export class ShortPost extends ShortDetailDto {
  @ApiProperty()
  Category: ShortCategory;

  @ApiProperty({ type: PostShortContent, isArray: true })
  Contents: PostShortContent[];
}
