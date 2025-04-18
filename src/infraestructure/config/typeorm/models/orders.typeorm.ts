import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClientModel } from './clients.typeorm';

@Entity('orders')
export class OrderModel {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientModel)
  @JoinColumn({ name: 'client_id' })
  client: ClientModel;

  @Column({
    type: 'enum',
    enum: ['Received', 'In preparation', 'Dispatched', 'Delivered'],
  })
  status: 'Received' | 'In preparation' | 'Dispatched' | 'Delivered';

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
