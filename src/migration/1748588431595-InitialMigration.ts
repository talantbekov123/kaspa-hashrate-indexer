import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1748588431595 implements MigrationInterface {
    name = 'InitialMigration1748588431595'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "hashrate" ("id" SERIAL NOT NULL, "hashrate" numeric NOT NULL, "difficulty" bigint, "timestamp" bigint NOT NULL, CONSTRAINT "UQ_a39c681a034fd6c284e50952895" UNIQUE ("timestamp"), CONSTRAINT "PK_0737144203f0ed223065a01989a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "hashrate"`);
    }

}
