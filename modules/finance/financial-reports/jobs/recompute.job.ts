export const financialReportsRecomputeJob = {
  name: "finance/financial-reports.recompute",
  queue: "finance-financial-reports",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
