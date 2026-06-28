export const bankReconciliationSyncJob = {
  name: "finance/bank-reconciliation.sync",
  queue: "finance-bank-reconciliation",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
