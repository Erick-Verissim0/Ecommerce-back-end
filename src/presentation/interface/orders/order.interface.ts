type Status = 'Received' | 'In preparation' | 'Dispatched' | 'Delivered';

export interface OrderInterface {
  id?: number;
  client_id?: number;
  status: Status;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
