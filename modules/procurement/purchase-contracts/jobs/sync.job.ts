export const purchaseContractsSyncJob = {
  name: "procurement/purchase-contracts.sync",
  queue: "procurement-purchase-contracts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
