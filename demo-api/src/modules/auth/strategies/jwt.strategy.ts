import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import TokenPayload from '../interfaces/token-payload.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly authorizationService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.DEMOM2A;
        },
      ]),
      secretOrKey: configService.get('N_JWT_SECRET_KEY'),
    });
  }
  async validate(payload: TokenPayload) {
    return this.authorizationService.getUserById(payload.userId);
  }
}
