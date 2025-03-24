import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class SalesReports1742663897531 implements MigrationInterface {
  name = 'SalesReports1742663897531';
  private salesReports: Table = new Table({
    name: 'sales_reports',
    columns: [
      {
        name: 'id',
        type: 'SERIAL',
        isPrimary: true,
      },
      {
        name: 'period_start',
        type: 'TIMESTAMP',
        isNullable: false,
      },
      {
        name: 'period_end',
        type: 'TIMESTAMP',
        isNullable: false,
      },
      {
        name: 'total_sales',
        type: 'DECIMAL',
        precision: 10,
        scale: 2,
        isNullable: false,
      },
      {
        name: 'products_sold',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'file_path',
        type: 'VARCHAR',
        length: '255',
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

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.salesReports);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.salesReports);
  }
}
