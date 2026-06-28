export const bankReconciliationRecomputeJob = {
  name: "finance/bank-reconciliation.recompute",
  queue: "finance-bank-reconciliation",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
