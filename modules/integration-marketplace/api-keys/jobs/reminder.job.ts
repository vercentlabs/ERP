export const apiKeysReminderJob = {
  name: "integration-marketplace/api-keys.reminder",
  queue: "integration-marketplace-api-keys",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
