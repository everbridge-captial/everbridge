import { MigrationInterface, QueryRunner } from "typeorm";

export class UploaderImplementation1763564824805 implements MigrationInterface {
    name = 'UploaderImplementation1763564824805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "uploads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "filename" character varying NOT NULL, "key" character varying NOT NULL, "bucket" character varying NOT NULL, "mimetype" character varying NOT NULL, "size" integer NOT NULL, "url" character varying NOT NULL, "ownerId" uuid, CONSTRAINT "UQ_34365d7c50a3c5442d5d0b3a48a" UNIQUE ("key"), CONSTRAINT "PK_d1781d1eedd7459314f60f39bd3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "uploads" ADD CONSTRAINT "FK_0dcc068a4dbdf0951c7f4dd7a66" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "uploads" DROP CONSTRAINT "FK_0dcc068a4dbdf0951c7f4dd7a66"`);
        await queryRunner.query(`DROP TABLE "uploads"`);
    }

}
