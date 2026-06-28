export const checkoutRecomputeJob = {
  name: "commerce/checkout.recompute",
  queue: "commerce-checkout",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
