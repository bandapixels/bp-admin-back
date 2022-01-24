import {MigrationInterface, QueryRunner} from "typeorm";

export class refactorCreateAndUpdateDatesNaming1643024333231 implements MigrationInterface {
    name = 'refactorCreateAndUpdateDatesNaming1643024333231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`banda\`.\`tags\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`tags\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`posts\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`posts\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`files\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`files\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`users\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`users\` DROP COLUMN \`updatedAt\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`tags\` ADD \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`tags\` ADD \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`posts\` ADD \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`posts\` ADD \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`files\` ADD \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`files\` ADD \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0)`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`users\` ADD \`created_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`users\` ADD \`updated_at\` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`banda\`.\`users\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`users\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`files\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`files\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`posts\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`posts\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`tags\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`tags\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`users\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`users\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`files\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`files\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`posts\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`posts\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`tags\` ADD \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`banda\`.\`tags\` ADD \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
