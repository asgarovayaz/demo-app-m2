import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import TokenPayload from '../interfaces/token-payload.interface';
import { AuthService } from '../auth.service';
import {
  JWT_COOKIE_NAME,
  SECRET_KEY_NAME,
} from '@api-common/constants/app.constant';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authorizationService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.[JWT_COOKIE_NAME];
        },
      ]),
      secretOrKey: configService.get(SECRET_KEY_NAME),
    });
  }
  async validate(payload: TokenPayload) {
    return this.authorizationService.getUserById(payload.userId);
  }
}
