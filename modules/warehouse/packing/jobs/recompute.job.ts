export const packingRecomputeJob = {
  name: "warehouse/packing.recompute",
  queue: "warehouse-packing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
