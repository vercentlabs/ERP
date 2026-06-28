export const publicApiReminderJob = {
  name: "integration-marketplace/public-api.reminder",
  queue: "integration-marketplace-public-api",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
