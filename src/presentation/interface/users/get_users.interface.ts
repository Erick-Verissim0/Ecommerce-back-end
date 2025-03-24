type Type = 'admin' | 'client';

export interface GetUsersInterface {
  id?: number;
  name: string;
  email: string;
  type: Type;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
