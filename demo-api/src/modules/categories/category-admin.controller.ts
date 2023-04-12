import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Paginate } from '@api-common/interfaces/paginate.interface';
import { EStatus } from '@api-common/enums';
import { Category } from './dtos/category.dto';
import { CreateCategory } from './dtos/create-category.dto';
import { UpdateCategory } from './dtos/update-category.dto';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import RequestWithUser from '@modules/auth/interfaces/request-with-user.interface';

@Controller('categories-admin')
@ApiTags('Categories (Admin)')
export class CategoryAdminController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'List of Category for Admins',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: Category,
    isArray: true,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Default is 10',
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Default is 1',
    required: false,
  })
  getPagedUser(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
  ): Promise<Paginate<Category[]>> {
    return this.categoryService.getPaged(limit, page);
  }

  @Get(':categoryId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Selected Category for Admins',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: Category,
  })
  getOneUser(@Param('categoryId') categoryId: number): Promise<Category> {
    return this.categoryService.getData(categoryId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create Category',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Category,
  })
  @ApiBody({
    type: CreateCategory,
  })
  create(@Req() request: RequestWithUser, @Body() create: CreateCategory) {
    return this.categoryService.create(create, request.user);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update Category',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: Category,
  })
  @ApiBody({
    type: UpdateCategory,
  })
  update(@Req() request: RequestWithUser, @Body() update: UpdateCategory) {
    return this.categoryService.update(update, request.user);
  }

  @Delete(':categoryId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete Category',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  delete(
    @Req() request: RequestWithUser,
    @Param('categoryId') categoryId: number,
  ): Promise<boolean> {
    return this.categoryService.delete(categoryId, request.user);
  }
}
