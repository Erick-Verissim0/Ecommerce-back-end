import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class Clients1742580016359 implements MigrationInterface {
  name = 'Clients1742580016359';
  private clients: Table = new Table({
    name: 'clients',
    columns: [
      {
        name: 'id',
        type: 'SERIAL',
        isPrimary: true,
      },
      {
        name: 'user_id',
        type: 'INTEGER',
        isNullable: false,
      },
      {
        name: 'name',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'contact',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'address',
        type: 'VARCHAR',
        length: '255',
        isNullable: false,
      },
      {
        name: 'status',
        type: 'BOOLEAN',
        isNullable: false,
        default: true,
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

  private foreignKey = new TableForeignKey({
    columnNames: ['user_id'],
    referencedColumnNames: ['id'],
    referencedTableName: 'users',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.clients);
    await queryRunner.createForeignKey('clients', this.foreignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('clients', this.foreignKey);
    await queryRunner.dropTable(this.clients);
  }
}
