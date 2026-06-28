export const wavesReminderJob = {
  name: "warehouse/waves.reminder",
  queue: "warehouse-waves",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
