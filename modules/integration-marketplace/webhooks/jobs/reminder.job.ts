export const webhooksReminderJob = {
  name: "integration-marketplace/webhooks.reminder",
  queue: "integration-marketplace-webhooks",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
