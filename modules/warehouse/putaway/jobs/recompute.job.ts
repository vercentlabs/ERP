export const putawayRecomputeJob = {
  name: "warehouse/putaway.recompute",
  queue: "warehouse-putaway",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
