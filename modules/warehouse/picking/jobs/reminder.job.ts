export const pickingReminderJob = {
  name: "warehouse/picking.reminder",
  queue: "warehouse-picking",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
