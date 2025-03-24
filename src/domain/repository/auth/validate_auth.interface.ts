import { AuthInterface } from 'src/presentation/interface/auth/validate_auth.interface';

export interface ValidateAuthInterface {
  execute(token: string): Promise<AuthInterface>;
}
