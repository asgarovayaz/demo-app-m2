import { CreateDetailDto } from '@api-common/dto/create-detail.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { CreatePostContent } from './create-post-content.dto';

export class CreatePost extends CreateDetailDto {
  @ApiProperty()
  @IsNumber()
  CategoryId: number;

  @ApiProperty({ type: CreatePostContent, isArray: true })
  @IsArray()
  Contents: CreatePostContent[];
}
