import { MigrationInterface, QueryRunner } from 'typeorm';

export class generateInit1641284781238 implements MigrationInterface {
  name = 'generateInit1641284781238';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`banda\`.\`tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`banda\`.\`posts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`head\` varchar(255) NOT NULL, \`views\` int NOT NULL DEFAULT '0', \`public\` tinyint NOT NULL DEFAULT 0, \`subtitle\` varchar(255) NOT NULL, \`excerpt\` varchar(255) NOT NULL, \`minutes_to_read\` int NOT NULL, \`body\` longtext NOT NULL, \`publishedAt\` timestamp NULL, \`published\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`banda\`.\`files\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`s3Path\` varchar(255) NOT NULL, \`fileName\` varchar(255) NOT NULL, \`size\` int NOT NULL, \`mimeType\` varchar(255) NOT NULL, \`type\` enum ('IMAGE', 'PREVIEW') NOT NULL DEFAULT 'IMAGE', \`postId\` int NULL, UNIQUE INDEX \`IDX_a1e60fa67ff151cdd20168d577\` (\`s3Path\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`banda\`.\`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'ADMIN', UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`banda\`.\`posts_tags_tags\` (\`postsId\` int NOT NULL, \`tagsId\` int NOT NULL, INDEX \`IDX_cf364c7e6905b285c4b55a0034\` (\`postsId\`), INDEX \`IDX_ce163a967812183a51b044f740\` (\`tagsId\`), PRIMARY KEY (\`postsId\`, \`tagsId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`banda\`.\`files\` ADD CONSTRAINT \`FK_3d97c727c9f600ceff4ab57cd6d\` FOREIGN KEY (\`postId\`) REFERENCES \`banda\`.\`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`banda\`.\`posts_tags_tags\` ADD CONSTRAINT \`FK_cf364c7e6905b285c4b55a00343\` FOREIGN KEY (\`postsId\`) REFERENCES \`banda\`.\`posts\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`banda\`.\`posts_tags_tags\` ADD CONSTRAINT \`FK_ce163a967812183a51b044f7404\` FOREIGN KEY (\`tagsId\`) REFERENCES \`banda\`.\`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`banda\`.\`posts_tags_tags\` DROP FOREIGN KEY \`FK_ce163a967812183a51b044f7404\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`banda\`.\`posts_tags_tags\` DROP FOREIGN KEY \`FK_cf364c7e6905b285c4b55a00343\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`banda\`.\`files\` DROP FOREIGN KEY \`FK_3d97c727c9f600ceff4ab57cd6d\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_ce163a967812183a51b044f740\` ON \`banda\`.\`posts_tags_tags\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_cf364c7e6905b285c4b55a0034\` ON \`banda\`.\`posts_tags_tags\``,
    );
    await queryRunner.query(`DROP TABLE \`banda\`.\`posts_tags_tags\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`banda\`.\`users\``,
    );
    await queryRunner.query(`DROP TABLE \`banda\`.\`users\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_a1e60fa67ff151cdd20168d577\` ON \`banda\`.\`files\``,
    );
    await queryRunner.query(`DROP TABLE \`banda\`.\`files\``);
    await queryRunner.query(`DROP TABLE \`banda\`.\`posts\``);
    await queryRunner.query(`DROP TABLE \`banda\`.\`tags\``);
  }
}
