import { Request } from 'express';
import { AuthenticatedUserDto } from '../dtos/authenticated-user.dto';

interface RequestWithUser extends Request {
  user: AuthenticatedUserDto;
}

export default RequestWithUser;
