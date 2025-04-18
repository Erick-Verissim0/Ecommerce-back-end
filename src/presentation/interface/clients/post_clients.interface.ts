import { User } from "src/domain/entities/users";

export interface PostClientsInterface {
  id?: number;
  contact: string;
  address: string;
  status: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
  user_id?: number;
  user?: User;
}
