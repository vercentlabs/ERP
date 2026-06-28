export const goodsReceiptsSyncJob = {
  name: "procurement/goods-receipts.sync",
  queue: "procurement-goods-receipts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
