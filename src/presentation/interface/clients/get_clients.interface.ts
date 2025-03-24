export interface GetClientsInterface {
  id: number;
  name: string;
  contact: string;
  address: string;
  created_at: Date;
  updated_at: Date;
  user: {
    id: number;
    name: string;
    email: string;
    type: 'admin' | 'client';
    created_at: Date;
    updated_at: Date;
  };
}
