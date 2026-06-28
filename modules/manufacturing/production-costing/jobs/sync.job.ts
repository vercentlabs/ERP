export const productionCostingSyncJob = {
  name: "manufacturing/production-costing.sync",
  queue: "manufacturing-production-costing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
