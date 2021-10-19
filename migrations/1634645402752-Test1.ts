import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Test11634645402752 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'role',
            type: "enum('admin','user')",
            isNullable: false,
          },
          {
            name: 'refreshToken',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'datetime',
            isNullable: false,
          },
          {
            name: 'firstName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'lastName',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'age',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'tag',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'post',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'head',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'views',
            type: 'int',
            default: 0,
            isNullable: false,
          },
          {
            name: 'public',
            type: 'tinyint',
            default: 0,
            isNullable: false,
          },
          {
            name: 'subtitle',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'excerpt',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'image',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'preview_image',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'mins_to_read',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'body',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'url',
            type: 'varchar',
            default: null,
            isNullable: true,
          },
        ],
      }),
      true,
    );
    await queryRunner.createTable(
      new Table({
        name: 'post_tags_tag',
        columns: [
          {
            name: 'postId',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'tagId',
            type: 'int',
            isNullable: false,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user');
    await queryRunner.dropTable('post_tags_tag');
    await queryRunner.dropTable('tag');
    await queryRunner.dropTable('post');
  }
}
