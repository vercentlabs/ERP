export const pickingRecomputeJob = {
  name: "warehouse/picking.recompute",
  queue: "warehouse-picking",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
