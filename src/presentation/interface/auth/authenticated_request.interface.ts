import { Request } from 'express';
import { AuthInterface } from 'src/presentation/interface/auth/validate_auth.interface';

export interface AuthenticatedRequestInterface extends Request {
  user: AuthInterface;
}
