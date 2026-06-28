export const receivingRecomputeJob = {
  name: "warehouse/receiving.recompute",
  queue: "warehouse-receiving",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
