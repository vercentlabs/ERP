export const accountsReceivableSyncJob = {
  name: "finance/accounts-receivable.sync",
  queue: "finance-accounts-receivable",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
