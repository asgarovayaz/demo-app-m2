import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import RequestWithUser from './interfaces/request-with-user.interface';
import { Response } from 'express';
import { AuthService } from './auth.service';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { AuthorizeDto } from './dtos/authorize.dto';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags('Auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    const user = request.user;
    return user;
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @ApiOperation({
    summary: 'Auth user',
  })
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  async signIn(
    @Body() authDto: AuthorizeDto,
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user } = request;
    const cookie = this.authService.getCookieWithJwtToken(user.UserId);
    const refreshToken = this.authService.getCookieWithJwtRefreshToken(
      user.UserId,
    );
    await this.authService.setCurrentRefreshToken(
      refreshToken.token,
      user.UserId,
    );
    request.res.setHeader('Set-Cookie', [cookie, refreshToken.cookie]);
    return user;
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  @ApiOperation({
    summary: 'Sign out user',
  })
  async logOut(
    @Req() request: RequestWithUser,
    @Res() response: Response,
  ): Promise<any> {
    await this.authService.removeRefreshToken(request.user.UserId);
    response.setHeader('Set-Cookie', this.authService.signOutCookie());
    return response.sendStatus(200);
  }

  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const accessTokenCookie = this.authService.getCookieWithJwtToken(
      request.user.UserId,
    );

    request.res.setHeader('Set-Cookie', accessTokenCookie);
    return request.user;
  }
}
