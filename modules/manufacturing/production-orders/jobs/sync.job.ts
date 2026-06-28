export const productionOrdersSyncJob = {
  name: "manufacturing/production-orders.sync",
  queue: "manufacturing-production-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
