export const valuationReminderJob = {
  name: "inventory/valuation.reminder",
  queue: "inventory-valuation",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
