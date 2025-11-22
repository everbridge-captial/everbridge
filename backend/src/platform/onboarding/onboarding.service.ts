import { Injectable } from '@nestjs/common';
import { OnboardingRepository } from './onboarding.repository';
import { User } from '@platform/users';
import {
  OnboardingApplication,
  OnboardingState,
  OnboardingType,
} from './entities';
import { SmeOnboardingFormSchema } from './form-schema/sme-onboarding-form';
import { BaseService } from '@common/base';
import { Not } from 'typeorm';
import { SMEOnboardingWorkflowArgs } from '@workflow-engine/workflows';
import { TemporalService } from '@workflow-engine/temporal.service';

@Injectable()
export class OnboardingService extends BaseService<OnboardingApplication> {
  constructor(
    private readonly onboardingRepo: OnboardingRepository,
    private readonly temporal: TemporalService,
  ) {
    super(onboardingRepo, OnboardingApplication);
  }

  async smeOnbaording(onboardingWorkflowArgs: SMEOnboardingWorkflowArgs) {
    await this.temporal.start({
      event: 'SMEOnboardingWorkflow',
      eventId: `smeOnbaording-${onboardingWorkflowArgs.onboarding_record_id}`,
      payload: onboardingWorkflowArgs,
    });
  }

  async createdOnboardingApplication(data: {
    onboardingType: OnboardingType;
    initiator: User;
    registrationNumber: string;
    organizationName: string;
  }): Promise<OnboardingApplication | Error> {
    const existingApplication = await this.onboardingRepo.findOne({
      registrationNumber: data.registrationNumber,
      owner: data.initiator,
      state: Not(OnboardingState.CREATED),
    });

    if (
      existingApplication &&
      existingApplication.owner.id === data.initiator.id
    ) {
      return existingApplication;
    } else if (existingApplication) {
      return new Error('Application for this CR exists.');
    }

    const newOnboardingAppl = new OnboardingApplication();

    switch (data.onboardingType) {
      case OnboardingType.SME_ONBOARDING:
        newOnboardingAppl.schema = SmeOnboardingFormSchema;
        break;
      default:
        return new Error(
          `OnboardingType: ${data.onboardingType} is not support`,
        );
    }

    newOnboardingAppl.onboardingType = data.onboardingType;
    newOnboardingAppl.owner = data.initiator;
    newOnboardingAppl.registrationNumber = data.registrationNumber;
    newOnboardingAppl.organizationName = data.organizationName;

    const createdOnboardingApplication =
      await this.onboardingRepo.create(newOnboardingAppl);

    this.smeOnbaording({
      onboarding_record_id: createdOnboardingApplication.id,
    });

    return createdOnboardingApplication;
  }
}
