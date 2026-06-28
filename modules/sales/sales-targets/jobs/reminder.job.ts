export const salesTargetsReminderJob = {
  name: "sales/sales-targets.reminder",
  queue: "sales-sales-targets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
