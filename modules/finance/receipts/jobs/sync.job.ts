export const receiptsSyncJob = {
  name: "finance/receipts.sync",
  queue: "finance-receipts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
