import { ContentDetailDto } from '@api-common/dto/content-detail.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryShortContent extends ContentDetailDto {
  @ApiProperty()
  Title: string;
}
