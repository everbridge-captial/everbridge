import { proxyActivities } from '@temporalio/workflow';
import type * as activities from '../activities';

const {} = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

export interface SMEOnboardingWorkflowArgs {
  onboarding_record_id: string;
}

export async function SMEOnboardingWorkflow(
  args: SMEOnboardingWorkflowArgs,
): Promise<string> {
  const { onboarding_record_id } = args;

  console.log(`SMEOnboardingWorkflow started for ID: ${onboarding_record_id}`);

  return `SME Onboarding Workflow completed`;
}
