import { defineSignal, setHandler, condition } from '@temporalio/workflow';

export const submitFormSignal = defineSignal<[boolean]>('submitForm');
export const reviewDecisionSignal =
  defineSignal<['returned' | 'rejected' | 'approved']>('reviewDecision');
export const signingSubmitSignal = defineSignal<[boolean]>('signingSubmit');

export interface SMEOnboardingWorkflowArgs {
  onboarding_record_id: string;
}

export async function SMEOnboardingWorkflow(
  args: SMEOnboardingWorkflowArgs,
): Promise<string> {
  const { onboarding_record_id } = args;

  // =========================
  // STEP 1: Fill Form (Human Task)
  // =========================
  let formSubmitted = false;

  setHandler(submitFormSignal, (submitted: boolean) => {
    formSubmitted = submitted;
  });

  // Wait until user submits
  await condition(() => formSubmitted === true);

  // =========================
  // STEP 2: Review Form (Human Task)
  // =========================
  let decision: 'returned' | 'rejected' | 'approved' | null = null;

  setHandler(reviewDecisionSignal, (d) => {
    decision = d;
  });

  await condition(() => decision !== null);

  // Branching logic
  if (decision === 'returned') {
    // restart workflow from beginning
    return SMEOnboardingWorkflow({ onboarding_record_id });
  }

  if (decision === 'rejected') {
    return 'Rejected';
  }

  // =========================
  // STEP 3: Signing Task (Human Task)
  // =========================
  let signingSubmitted = false;

  setHandler(signingSubmitSignal, (submitted: boolean) => {
    signingSubmitted = submitted;
  });

  await condition(() => signingSubmitted === true);

  return 'Completed';
}
