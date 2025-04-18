import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity('sales_reports')
export class SalesReportModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  periodStart: Date;

  @Column({ type: 'timestamp', nullable: false })
  periodEnd: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  totalSales: number;

  @Column({ type: 'int', nullable: false })
  productsSold: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  filePath: string;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
