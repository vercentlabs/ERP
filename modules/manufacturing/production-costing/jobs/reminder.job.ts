export const productionCostingReminderJob = {
  name: "manufacturing/production-costing.reminder",
  queue: "manufacturing-production-costing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
