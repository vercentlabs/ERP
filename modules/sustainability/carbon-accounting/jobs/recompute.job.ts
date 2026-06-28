export const carbonAccountingRecomputeJob = {
  name: "sustainability/carbon-accounting.recompute",
  queue: "sustainability-carbon-accounting",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
