export const couponsRecomputeJob = {
  name: "commerce/coupons.recompute",
  queue: "commerce-coupons",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
