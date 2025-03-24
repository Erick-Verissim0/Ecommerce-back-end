import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Orders1742587051820 implements MigrationInterface {
  name = 'Orders1742587051820';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'SERIAL',
            isPrimary: true,
          },
          {
            name: 'client_id',
            type: 'INTEGER',
            isNullable: false,
          },
          {
            name: 'status',
            type: 'VARCHAR',
            length: '15',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'VARCHAR',
            length: '255',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'VARCHAR',
            length: '7',
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
      }),
    );

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'clients',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('orders');
  }
}
