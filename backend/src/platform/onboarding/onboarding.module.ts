import { Module } from '@nestjs/common';
import { OnboardingController } from './onboarding.controller';
import { OnboardingService } from './onboarding.service';
import { OnboardingRepository } from './onboarding.repository';
import { OnboardingApplication } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkflowEngineModule } from '@workflow-engine/workflow-engine.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OnboardingApplication]),
    WorkflowEngineModule,
  ],
  controllers: [OnboardingController],
  providers: [OnboardingService, OnboardingRepository],
  exports: [OnboardingService],
})
export class OnboardingModule {}
