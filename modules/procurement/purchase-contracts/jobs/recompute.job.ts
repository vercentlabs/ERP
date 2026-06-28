export const purchaseContractsRecomputeJob = {
  name: "procurement/purchase-contracts.recompute",
  queue: "procurement-purchase-contracts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
