export const transportCostingSyncJob = {
  name: "logistics/transport-costing.sync",
  queue: "logistics-transport-costing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
