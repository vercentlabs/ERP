export const transportCostingRecomputeJob = {
  name: "logistics/transport-costing.recompute",
  queue: "logistics-transport-costing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
