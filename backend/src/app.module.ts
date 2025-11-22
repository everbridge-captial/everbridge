import { Module } from '@nestjs/common';
import { AppConfigModule } from '@common/config/config.module';
import { CoreModule } from '@core/core.module';
import { DatabaseModule } from '@common/database/database.module';
import { OrganizationsModule } from '@platform/organizations/organization.module';
import { UsersModule } from '@platform/users/users.module';
import { InvitationsModule } from '@platform/invitations/invitations.module';
import { OnboardingModule } from '@platform/onboarding';
import { WorkflowEngineModule } from '@workflow-engine/workflow-engine.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    OnboardingModule,
    UsersModule,
    OrganizationsModule,
    CoreModule,
    InvitationsModule,
    WorkflowEngineModule,
  ],
  controllers: [],
})
export class AppModule {}
