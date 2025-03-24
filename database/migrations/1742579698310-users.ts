import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1742579698310 implements MigrationInterface {
  name = 'Users1742579698310';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'email',
            type: 'VARCHAR',
            length: '255',
            isNullable: false,
            isUnique: true,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
