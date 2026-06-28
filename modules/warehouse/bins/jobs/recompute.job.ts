export const binsRecomputeJob = {
  name: "warehouse/bins.recompute",
  queue: "warehouse-bins",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
