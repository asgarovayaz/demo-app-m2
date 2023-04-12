import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  Post,
  Body,
  DefaultValuePipe,
  Delete,
  Param,
  ParseIntPipe,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Post as PostDto } from './dtos/post.dto';
import { Paginate } from '@api-common/interfaces/paginate.interface';
import RequestWithUser from '@modules/auth/interfaces/request-with-user.interface';
import { CreatePost } from './dtos/create-post.dto';
import { UpdatePost } from './dtos/update-post.dto';
import { PostService } from './post.service';

@Controller('posts-admin')
@ApiTags('Posts (Admin)')
export class PostAdminController {
  constructor(private postService: PostService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'List of Posts for Admins',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: Post,
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
    description: 'A parameter. Optional',
    required: false,
  })
  getPagedUser(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('categoryId') category: number,
  ): Promise<Paginate<PostDto[]>> {
    return this.postService.getPaged(limit, page, category);
  }

  @Get(':postId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Selected Post for Admins',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: Post,
  })
  getOneUser(@Param('postId') postId: number): Promise<PostDto> {
    return this.postService.getData(postId);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Create Post',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: Post,
  })
  @ApiBody({
    type: CreatePost,
  })
  create(@Req() request: RequestWithUser, @Body() create: CreatePost) {
    return this.postService.create(create, request.user);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update Post',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: Post,
  })
  @ApiBody({
    type: UpdatePost,
  })
  update(@Req() request: RequestWithUser, @Body() update: UpdatePost) {
    return this.postService.update(update, request.user);
  }

  @Delete(':postId')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Delete Post',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
  })
  delete(
    @Req() request: RequestWithUser,
    @Param('postId') postId: number,
  ): Promise<boolean> {
    return this.postService.delete(postId, request.user);
  }
}
