export const valuationSyncJob = {
  name: "inventory/valuation.sync",
  queue: "inventory-valuation",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
