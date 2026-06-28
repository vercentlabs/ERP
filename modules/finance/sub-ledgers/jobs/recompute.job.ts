export const subLedgersRecomputeJob = {
  name: "finance/sub-ledgers.recompute",
  queue: "finance-sub-ledgers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
