export const accountingPeriodsRecomputeJob = {
  name: "finance/accounting-periods.recompute",
  queue: "finance-accounting-periods",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
