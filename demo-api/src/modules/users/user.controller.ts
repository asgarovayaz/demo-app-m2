import { EStatus } from '@api-common/enums';
import { Paginate } from '@api-common/interfaces/paginate.interface';
import {
  Body,
  Controller,
  DefaultValuePipe,
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
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { DetailUserDto } from './dtos/detail-user.dto';
import { ProfileDto } from './dtos/profile.dto';
import { UserService } from './user.service';
import { UpdateAdministratorDto } from './dtos/update-administrator.dto';
import { CreateAdministratorDto } from './dtos/create-administrator.dto';
import RequestWithUser from '@modules/auth/interfaces/request-with-user.interface';
import ClaimGuard from '@modules/auth/guards/claim.guard';
import UserClaim from '@api-common/claims/user.claim';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post('create-user')
  @ApiOperation({
    summary: 'Create user',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
  })
  createAdminUser(): Promise<boolean> {
    return this.usersService.registerAdmin();
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update profile',
  })
  @ApiCreatedResponse({
    status: HttpStatus.ACCEPTED,
    description: 'User created',
  })
  @ApiBody({
    type: ProfileDto,
  })
  updateProfile(
    @Req() request: RequestWithUser,
    @Body() updateProfile: ProfileDto,
  ): Promise<boolean> {
    return this.usersService.updateProfile(updateProfile, request.user);
  }

  @Put('update-password')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update profile',
  })
  @ApiCreatedResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
  })
  @ApiBody({
    type: ProfileDto,
  })
  changePassword(
    @Req() request: RequestWithUser,
    @Body() changePassword: ChangePasswordDto,
  ): Promise<boolean> {
    return this.usersService.changePassword(changePassword, request.user);
  }

  @Get('global')
  @UseGuards(JwtAuthGuard)
  @UseGuards(ClaimGuard(UserClaim.ViewUser))
  @ApiOperation({
    summary: 'List of Administrators',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: DetailUserDto,
    isArray: true,
  })
  getAdministratorPagedData(
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit = 10,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('showMode') showMode: EStatus,
  ): Promise<Paginate<DetailUserDto[]>> {
    return this.usersService.getAdministrators(limit, page, showMode);
  }

  @Get('global/detail/:detailId')
  @UseGuards(JwtAuthGuard)
  @UseGuards(ClaimGuard(UserClaim.ViewUser))
  @ApiOperation({
    summary: 'Get user detail',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
    type: DetailUserDto,
  })
  getAdministratorOne(
    @Param('detailId') detailId: number,
  ): Promise<DetailUserDto> {
    return this.usersService.getAdministratorById(detailId);
  }

  @Post('global')
  @UseGuards(JwtAuthGuard)
  @UseGuards(ClaimGuard(UserClaim.CreateUser))
  @ApiOperation({
    summary: 'Create Administrator',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: DetailUserDto,
  })
  @ApiBody({
    description: 'Create Administrator',
    type: CreateAdministratorDto,
  })
  createAdministrator(
    @Req() request: RequestWithUser,
    @Body() createDto: CreateAdministratorDto,
  ): Promise<DetailUserDto> {
    return this.usersService.createAdministrator(createDto, request.user);
  }

  @Put('global')
  @UseGuards(JwtAuthGuard)
  @UseGuards(ClaimGuard(UserClaim.EditUser))
  @ApiOperation({
    summary: 'Update Admin Item',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UpdateAdministratorDto,
  })
  updateAdministrator(
    @Req() request: RequestWithUser,
    @Body() updateDto: UpdateAdministratorDto,
  ): Promise<DetailUserDto> {
    return this.usersService.updateAdministrator(updateDto, request.user);
  }
}
