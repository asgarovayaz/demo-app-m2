import { ContentDetailDto } from '@api-common/dto/content-detail.dto';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryContent extends ContentDetailDto {
  @ApiProperty()
  Title: string;
}
