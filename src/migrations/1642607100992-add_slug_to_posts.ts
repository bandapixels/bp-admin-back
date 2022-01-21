import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addSlugToPosts1642607100992 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'posts',
      new TableColumn({
        name: 'slug',
        type: 'varchar',
        isUnique: true,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('posts', 'slug');
  }
}
