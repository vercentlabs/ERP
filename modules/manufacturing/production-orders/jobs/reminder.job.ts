export const productionOrdersReminderJob = {
  name: "manufacturing/production-orders.reminder",
  queue: "manufacturing-production-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
