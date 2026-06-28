export const returnsRecomputeJob = {
  name: "sales/returns.recompute",
  queue: "sales-returns",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
