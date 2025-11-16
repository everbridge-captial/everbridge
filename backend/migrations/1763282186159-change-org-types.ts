import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeOrgTypes1763282186159 implements MigrationInterface {
    name = 'ChangeOrgTypes1763282186159'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "type" SET DEFAULT 'SME'`);
        await queryRunner.query(`ALTER TABLE "invitation" ALTER COLUMN "organizationType" SET DEFAULT 'SME'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "invitation" ALTER COLUMN "organizationType" SET DEFAULT 'SUPPLIER'`);
        await queryRunner.query(`ALTER TABLE "organizations" ALTER COLUMN "type" SET DEFAULT 'SUPPLIER'`);
    }

}
