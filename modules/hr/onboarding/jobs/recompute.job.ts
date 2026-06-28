export const onboardingRecomputeJob = {
  name: "hr/onboarding.recompute",
  queue: "hr-onboarding",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
