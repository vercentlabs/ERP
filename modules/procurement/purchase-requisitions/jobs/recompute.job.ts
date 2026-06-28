export const purchaseRequisitionsRecomputeJob = {
  name: "procurement/purchase-requisitions.recompute",
  queue: "procurement-purchase-requisitions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
