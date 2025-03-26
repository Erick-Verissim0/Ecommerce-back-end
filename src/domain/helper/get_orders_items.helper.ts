export const orderItemMapHelper = (orderItems: any) => {
  return orderItems.map((data) => ({
    id: data.id,
    quantity: data.quantity,
    price_per_unit: data.price_per_unit,
    total_price: data.total_price,
    created_at: data.created_at,
    updated_at: data.updated_at,
    deleted_at: data.deleted_at,
    order: {
      order_id: data?.order.id,
      order_status: data?.order.status,
      order_total_price: data?.order.total_price,
    },
    product: {
      product_id: data?.product.id,
      product_name: data?.product.name,
      product_description: data?.product.description,
      product_price: data?.product.price,
      product_stock: data?.product.stock,
    },
  }));
};
