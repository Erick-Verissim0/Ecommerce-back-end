type Type = 'admin' | 'client';

export interface AuthInterface {
  id: number;
  name: string;
  email: string;
  type: Type;
}
