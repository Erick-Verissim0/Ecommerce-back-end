type StatusType = 'Received' | 'In preparation' | 'Dispatched' | 'Delivered';

export class Order {
  constructor(
    public status: StatusType,
    public total_price: number,
    public id?: number,
    public client_id?: number,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date,
  ) {
    if (
      !['Received', 'In preparation', 'Dispatched', 'Delivered'].includes(
        status,
      )
    )
      throw new Error('Invalid status type');

    if (total_price == null) throw new Error('Total price is required');
  }
}
