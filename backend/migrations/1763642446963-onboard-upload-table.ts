import { MigrationInterface, QueryRunner } from "typeorm";

export class OnboardUploadTable1763642446963 implements MigrationInterface {
    name = 'OnboardUploadTable1763642446963'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "onboarding_application_uploads" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "createdBy" character varying, "updatedBy" character varying, "fieldKey" character varying NOT NULL, "notes" character varying, "uploadId" uuid, "applicationId" uuid, CONSTRAINT "PK_dd057af17422ff6a3ed507c0ef3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "onboarding_application_uploads" ADD CONSTRAINT "FK_bf6adc6a57ed1a6a757669f6b01" FOREIGN KEY ("uploadId") REFERENCES "uploads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "onboarding_application_uploads" ADD CONSTRAINT "FK_26f455a9f5f19620ae952d56346" FOREIGN KEY ("applicationId") REFERENCES "onboarding_applications"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "onboarding_application_uploads" DROP CONSTRAINT "FK_26f455a9f5f19620ae952d56346"`);
        await queryRunner.query(`ALTER TABLE "onboarding_application_uploads" DROP CONSTRAINT "FK_bf6adc6a57ed1a6a757669f6b01"`);
        await queryRunner.query(`DROP TABLE "onboarding_application_uploads"`);
    }

}
