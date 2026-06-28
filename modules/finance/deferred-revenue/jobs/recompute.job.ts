export const deferredRevenueRecomputeJob = {
  name: "finance/deferred-revenue.recompute",
  queue: "finance-deferred-revenue",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
