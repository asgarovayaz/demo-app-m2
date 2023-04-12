import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { AuthService } from '../auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import TokenPayload from '../interfaces/token-payload.interface';

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
          return request?.cookies?.DEMOM2R;
        },
      ]),
      secretOrKey: configService.get('N_JWT_REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }
  async validate(request: Request, payload: TokenPayload) {
    const refreshToken = request?.cookies?.MYSWSR;
    return this.authorizationService.getUserIfRefreshTokenMatches(
      refreshToken,
      payload.userId,
    );
  }
}
