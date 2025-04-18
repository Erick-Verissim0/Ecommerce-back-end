import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderModel } from "./orders.typeorm";
import { ProductModel } from "./products.typeorm";

@Entity('orders_items')
export class OrderItemModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => OrderModel)
  @JoinColumn({ name: 'order_id' })
  order: OrderModel;

  @ManyToOne(() => ProductModel)
  @JoinColumn({ name: 'product_id' })
  product: ProductModel;

  @Column({ type: 'integer' })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price_per_unit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
