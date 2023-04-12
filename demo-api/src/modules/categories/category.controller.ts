import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { ShortCategory } from './dtos/short-category.dto';

@Controller('categories')
@ApiTags('Categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOperation({
    summary: 'List of Category for Users',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ShortCategory,
    isArray: true,
  })
  async getPagedUser(): Promise<ShortCategory[]> {
    return this.categoryService.getShort();
  }

  @Get(':categoryId')
  @ApiOperation({
    summary: 'Selected Category for Users',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ShortCategory,
  })
  async getOneUser(
    @Param('categoryId') categoryId: number,
  ): Promise<ShortCategory> {
    return this.categoryService.getShortData(categoryId);
  }
}
