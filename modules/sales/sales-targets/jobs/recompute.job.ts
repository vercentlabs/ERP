export const salesTargetsRecomputeJob = {
  name: "sales/sales-targets.recompute",
  queue: "sales-sales-targets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
