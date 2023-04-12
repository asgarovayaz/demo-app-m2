import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { AuthenticatedUserDto } from '../dtos/authenticated-user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authorizationService: AuthService) {
    super({
      usernameField: 'Email',
      passwordField: 'Passcode',
    });
  }
  async validate(
    Email: string,
    Passcode: string,
  ): Promise<AuthenticatedUserDto> {
    return this.authorizationService.getAuthenticatedUser(Email, Passcode);
  }
}
