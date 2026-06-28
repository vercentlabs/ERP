export const biConnectorsReminderJob = {
  name: "data-platform/bi-connectors.reminder",
  queue: "data-platform-bi-connectors",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
