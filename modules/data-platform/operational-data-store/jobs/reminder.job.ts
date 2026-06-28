export const operationalDataStoreReminderJob = {
  name: "data-platform/operational-data-store.reminder",
  queue: "data-platform-operational-data-store",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
