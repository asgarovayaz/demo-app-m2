import { UpdateDetailDto } from '@api-common/dto/update-detail.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional } from 'class-validator';
import { UpdatePostContent } from './update-post-content.dto';

export class UpdatePost extends UpdateDetailDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  CategoryId: number;

  @ApiPropertyOptional({ type: UpdatePostContent, isArray: true })
  @IsOptional()
  @IsArray()
  Contents: UpdatePostContent[];
}
