export const blanketOrdersRecomputeJob = {
  name: "procurement/blanket-orders.recompute",
  queue: "procurement-blanket-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
