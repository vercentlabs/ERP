export const accountsReceivableRecomputeJob = {
  name: "finance/accounts-receivable.recompute",
  queue: "finance-accounts-receivable",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
