import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class OrdersItems1742663212173 implements MigrationInterface {
  name = 'OrdersItems1742663212173';

  private ordersItems: Table = new Table({
    name: 'orders_items',
    columns: [
      {
        name: 'id',
        type: 'SERIAL',
        isPrimary: true,
      },
      {
        name: 'order_id',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'product_id',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'quantity',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'price_per_unit',
        type: 'DECIMAL',
        precision: 10,
        scale: 2,
        isNullable: false,
      },
      {
        name: 'total_price',
        type: 'DECIMAL',
        precision: 10,
        scale: 2,
        isNullable: false,
      },
      {
        name: 'created_at',
        type: 'TIMESTAMP',
        default: 'NOW()',
      },
      {
        name: 'updated_at',
        type: 'TIMESTAMP',
        default: 'NOW()',
      },
      {
        name: 'deleted_at',
        type: 'TIMESTAMP',
        isNullable: true,
      },
    ],
  });

  private foreignKeyOrder = new TableForeignKey({
    columnNames: ['order_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'orders',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  private foreignKeyProduct = new TableForeignKey({
    columnNames: ['product_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'products',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.ordersItems);
    await queryRunner.createForeignKey('orders_items', this.foreignKeyOrder);
    await queryRunner.createForeignKey('orders_items', this.foreignKeyProduct);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders_items', this.foreignKeyOrder);
    await queryRunner.dropForeignKey('orders_items', this.foreignKeyProduct);
    await queryRunner.dropTable(this.ordersItems);
  }
}
