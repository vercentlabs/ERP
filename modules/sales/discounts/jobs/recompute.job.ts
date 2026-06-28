export const discountsRecomputeJob = {
  name: "sales/discounts.recompute",
  queue: "sales-discounts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
