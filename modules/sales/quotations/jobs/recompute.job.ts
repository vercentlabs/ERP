export const quotationsRecomputeJob = {
  name: "sales/quotations.recompute",
  queue: "sales-quotations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
