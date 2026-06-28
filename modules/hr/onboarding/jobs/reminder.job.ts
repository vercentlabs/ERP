export const onboardingReminderJob = {
  name: "hr/onboarding.reminder",
  queue: "hr-onboarding",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
