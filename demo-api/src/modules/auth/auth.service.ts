import { UserEntity } from '@modules/users/user.entity';
import { UserService } from '@modules/users/user.service';
import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import TokenPayload from './interfaces/token-payload.interface';
import {
  EMAIL_NOT_EXIST,
  PASSCODE_OR_EMAIL_ERROR,
  USER_NOT_FOUND,
} from '@api-common/constants/error-mesages.constant';
import { AuthMapping } from './auth.maping';
import {
  AuthCookieString,
  EXP_TIME_KEY_NAME,
  REFRESH_TOKEN_EXP_TIME_KEY_NAME,
  REFRESH_TOKEN_SECRET_KEY_NAME,
  RefreshCookieString,
  RESET_JWT_TOKEN_COOKIE,
  RESET_REFRESH_TOKEN_COOKIE,
  SECRET_KEY_NAME,
} from '@api-common/constants/app.constant';
import { AuthenticatedUserDto } from './dtos/authenticated-user.dto';

@Injectable()
export class AuthService {
  mapTo = new AuthMapping();
  constructor(
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async getUserByEmail(Email: string): Promise<UserEntity> {
    const user = await this.userService.getUserByEmail(Email);
    if (user) {
      return user;
    }
    throw new HttpException(EMAIL_NOT_EXIST, HttpStatus.NOT_FOUND);
  }

  async getUserById(Id: number): Promise<AuthenticatedUserDto> {
    const user = await this.userService.getUserById(Id);
    if (user) {
      return this.mapTo.one(user);
    }
    throw new HttpException(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
  }

  async getAuthenticatedUser(
    Email: string,
    hashedPasscode: string,
  ): Promise<AuthenticatedUserDto> {
    try {
      const user = await this.getUserByEmail(Email);
      const isPasscodeMatching = await bcrypt.compare(
        hashedPasscode,
        user.Passcode,
      );
      if (!isPasscodeMatching) {
        throw new HttpException(
          PASSCODE_OR_EMAIL_ERROR,
          HttpStatus.BAD_REQUEST,
        );
      }
      return this.mapTo.one(user);
    } catch (error) {
      throw new HttpException(PASSCODE_OR_EMAIL_ERROR, HttpStatus.BAD_REQUEST);
    }
  }

  async setCurrentRefreshToken(
    refreshToken: string,
    userId: number,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.userService.updateRefreshToken(userId, hashedRefreshToken);
  }

  async removeRefreshToken(userId: number): Promise<UserEntity> {
    return this.userService.updateRefreshToken(userId, null);
  }

  public signOutCookie(): string[] {
    return [RESET_JWT_TOKEN_COOKIE, RESET_REFRESH_TOKEN_COOKIE];
  }

  async getUserIfRefreshTokenMatches(
    RefreshToken: string,
    Id: number,
  ): Promise<AuthenticatedUserDto> {
    const user = await this.userService.getUserById(Id);

    const isRefreshTokenMatching = await bcrypt.compare(
      RefreshToken,
      user.HashedRefreshToken,
    );

    if (isRefreshTokenMatching) {
      return this.mapTo.one(user);
    }
  }

  public getCookieWithJwtToken(userId: number): string {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get(SECRET_KEY_NAME),
      expiresIn: `${this.configService.get(EXP_TIME_KEY_NAME)}s`,
    });

    return AuthCookieString(token, this.configService.get(EXP_TIME_KEY_NAME));
  }

  public getCookieWithJwtRefreshToken(userId: number): {
    cookie: string;
    token: string;
  } {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get(REFRESH_TOKEN_SECRET_KEY_NAME),
      expiresIn: `${this.configService.get(REFRESH_TOKEN_EXP_TIME_KEY_NAME)}s`,
    });

    const cookie = RefreshCookieString(
      token,
      this.configService.get(REFRESH_TOKEN_EXP_TIME_KEY_NAME),
    );
    return {
      cookie,
      token,
    };
  }
}
