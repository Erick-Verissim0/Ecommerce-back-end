export class Client {
  constructor(
    public name: string,
    public contact: string,
    public address: string,
    public status: boolean = true,
    public id?: number,
    public user_id?: number,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date,
  ) {
    if (!name) throw new Error('Name is required!');
    if (user_id == null) throw new Error('User ID is required');
  }
}
