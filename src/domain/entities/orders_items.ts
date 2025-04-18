export class OrderItem {
  constructor(
    public quantity: number,
    public price_per_unit: number,
    public total_price: number,
    public id?: number,
    public order_id?: number,
    public product_id?: number,
    public created_at?: Date,
    public updated_at?: Date,
    public deleted_at?: Date,
  ) {
    const requiredFields = { quantity, price_per_unit, total_price };

    Object.entries(requiredFields).forEach(([key, value]) => {
      if (value == null) throw new Error(`${key} is required`);
    });
  }
}
