type Type = 'admin' | 'client';

export interface UsersInterface {
  id?: number;
  name: string;
  email: string;
  password?: string;
  type: Type;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
