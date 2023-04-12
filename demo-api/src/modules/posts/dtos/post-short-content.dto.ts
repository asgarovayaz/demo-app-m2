import { ContentDetailDto } from '@api-common/dto/content-detail.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PostShortContent extends ContentDetailDto {
  @ApiProperty()
  Title: string;

  @ApiProperty()
  Description: string;
}
