import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Products1742586722531 implements MigrationInterface {
  name = 'Products1742586722531';
  private products: Table = new Table({
    name: 'products',
    columns: [
      {
        name: 'id',
        type: 'SERIAL',
        isPrimary: true,
      },
      {
        name: 'name',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'description',
        type: 'VARCHAR',
        length: '500',
        isNullable: false,
      },
      {
        name: 'price',
        type: 'DECIMAL',
        precision: 10,
        scale: 2,
        isNullable: false,
      },
      {
        name: 'stock',
        type: 'INTEGER',
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
    await queryRunner.createTable(this.products);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.products);
  }
}
