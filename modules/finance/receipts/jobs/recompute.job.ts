export const receiptsRecomputeJob = {
  name: "finance/receipts.recompute",
  queue: "finance-receipts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
