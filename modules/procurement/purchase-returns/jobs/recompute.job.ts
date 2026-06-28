export const purchaseReturnsRecomputeJob = {
  name: "procurement/purchase-returns.recompute",
  queue: "procurement-purchase-returns",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
