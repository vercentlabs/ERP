export const accountsPayableRecomputeJob = {
  name: "finance/accounts-payable.recompute",
  queue: "finance-accounts-payable",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
