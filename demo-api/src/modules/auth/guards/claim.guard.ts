import ERole from '@api-common/enums/role.enum';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import RequestWithUser from '../interfaces/request-with-user.interface';
import { JwtAuthGuard } from './jwt-auth.guard';
import Claim from '@api-common/claims/claim.type';

const ClaimGuard = (claim: Claim): Type<CanActivate> => {
  class ClaimGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<RequestWithUser>();
      const user = request.user;

      if (user.Role === ERole.Admin) return true;

      return user?.Claims.includes(claim);
    }
  }

  return mixin(ClaimGuardMixin);
};

export default ClaimGuard;
