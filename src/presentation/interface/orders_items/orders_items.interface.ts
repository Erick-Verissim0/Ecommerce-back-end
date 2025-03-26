export interface OrdersItemsInterface {
  id: number;
  order: {
    order_id: number;
    order_status: 'Received' | 'In preparation' | 'Dispatched' | 'Delivered';
    order_total_price: number;
  };
  product: {
    product_id: number;
    product_name: string;
    product_description: string;
    product_price: number;
    product_stock: number;
  };
  quantity: number;
  price_per_unit: number;
  total_price: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
}
