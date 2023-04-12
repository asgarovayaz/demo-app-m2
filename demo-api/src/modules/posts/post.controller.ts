import {
  Controller,
  DefaultValuePipe,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { Paginate } from '@api-common/interfaces/paginate.interface';
import { ShortPost } from './dtos/short-post.dto';

@Controller('posts')
@ApiTags('Posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  @ApiOperation({
    summary: 'List of Post for Users',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ShortPost,
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
  @ApiQuery({
    name: 'categoryId',
    type: Number,
    description: 'A parameter. Optional.',
    required: false,
  })
  getPagedUser(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('categoryId') category: number,
  ): Promise<Paginate<ShortPost[]>> {
    return this.postService.getShortPaged(limit, page, category);
  }

  @Get(':postId')
  @ApiOperation({
    summary: 'Selected Post for Users',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: ShortPost,
  })
  getOneUser(@Param('postId') postId: number): Promise<ShortPost> {
    return this.postService.getShortData(postId);
  }
}
