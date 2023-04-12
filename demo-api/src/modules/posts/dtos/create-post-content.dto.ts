import { CreateContentDetailDto } from '@api-common/dto/create-content-detail.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePostContent extends CreateContentDetailDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  Title: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  Description: string;
}
