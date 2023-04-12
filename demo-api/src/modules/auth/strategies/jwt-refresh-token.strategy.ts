import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import TokenPayload from '../interfaces/token-payload.interface';
import {
  REFRESH_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_SECRET_KEY_NAME,
} from '@api-common/constants/app.constant';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh-token',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authorizationService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.[REFRESH_TOKEN_COOKIE_NAME];
        },
      ]),
      secretOrKey: configService.get(REFRESH_TOKEN_SECRET_KEY_NAME),
      passReqToCallback: true,
    });
  }
  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = request?.cookies?.[REFRESH_TOKEN_COOKIE_NAME];
    return this.authorizationService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.userId,
    );
  }
}
