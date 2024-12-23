import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPasswordColumn1734990804132 implements MigrationInterface {
    name = 'AddPasswordColumn1734990804132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "password" character varying(200) NOT NULL DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    }

}
