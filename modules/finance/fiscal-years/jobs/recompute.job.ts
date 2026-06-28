export const fiscalYearsRecomputeJob = {
  name: "finance/fiscal-years.recompute",
  queue: "finance-fiscal-years",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
