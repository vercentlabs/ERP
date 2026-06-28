export const goodsReceiptsRecomputeJob = {
  name: "procurement/goods-receipts.recompute",
  queue: "procurement-goods-receipts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
