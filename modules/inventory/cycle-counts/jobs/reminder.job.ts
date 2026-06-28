export const cycleCountsReminderJob = {
  name: "inventory/cycle-counts.reminder",
  queue: "inventory-cycle-counts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
