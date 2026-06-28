export const cycleCountsRecomputeJob = {
  name: "inventory/cycle-counts.recompute",
  queue: "inventory-cycle-counts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
