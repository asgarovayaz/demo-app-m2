import { DetailDto } from '@api-common/dto/detail.dto';
import { ApiProperty } from '@nestjs/swagger';
import { PostContent } from './post-content.dto';

export class Post extends DetailDto {
  @ApiProperty()
  CategoryId: number;

  @ApiProperty()
  Contents: PostContent[];
}
