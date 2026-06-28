export const connectorsReminderJob = {
  name: "integration-marketplace/connectors.reminder",
  queue: "integration-marketplace-connectors",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
