export const purchaseReturnsSyncJob = {
  name: "procurement/purchase-returns.sync",
  queue: "procurement-purchase-returns",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
