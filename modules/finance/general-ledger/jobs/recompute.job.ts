export const generalLedgerRecomputeJob = {
  name: "finance/general-ledger.recompute",
  queue: "finance-general-ledger",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
