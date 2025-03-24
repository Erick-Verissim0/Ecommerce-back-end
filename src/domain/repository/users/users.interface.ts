import { User } from 'src/domain/entities/users';

export interface UsersRepository {
  createUser(userData: Partial<User>): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  getAllUsers(): Promise<User[] | null>;
  getOneUser(id: number): Promise<Partial<User> | null>;
  updateUsers(id, updateData: Partial<User>): Promise<User | null>;
  deleteUser(id: number): Promise<User | null>;
}

export const UsersRepository = Symbol('UsersRepository');
