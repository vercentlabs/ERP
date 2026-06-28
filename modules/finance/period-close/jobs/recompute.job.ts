export const periodCloseRecomputeJob = {
  name: "finance/period-close.recompute",
  queue: "finance-period-close",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
