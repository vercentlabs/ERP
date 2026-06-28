export const accountsPayableSyncJob = {
  name: "finance/accounts-payable.sync",
  queue: "finance-accounts-payable",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
