import { CreateContentDetailDto } from '@api-common/dto/create-content-detail.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateCategoryContent extends CreateContentDetailDto {
  @ApiProperty()
  @IsString()
  @MinLength(2)
  Title: string;
}
