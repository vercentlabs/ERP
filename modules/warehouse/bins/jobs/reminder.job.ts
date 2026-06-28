export const binsReminderJob = {
  name: "warehouse/bins.reminder",
  queue: "warehouse-bins",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
