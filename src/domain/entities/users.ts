export type UserType = 'admin' | 'client';

export class User {
  constructor(
    public name: string,
    public email: string,
    public type: UserType,
    public password?: string,
    public id?: number,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date,
  ) {
    if (!name) throw new Error('Name is Required');
    if (!email.includes('@')) throw new Error('Invalid email');
    if (!['admin', 'client'].includes(type))
      throw new Error('Invalid user type');
  }
}
