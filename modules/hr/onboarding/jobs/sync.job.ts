export const onboardingSyncJob = {
  name: "hr/onboarding.sync",
  queue: "hr-onboarding",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
