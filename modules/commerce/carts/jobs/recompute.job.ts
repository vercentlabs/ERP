export const cartsRecomputeJob = {
  name: "commerce/carts.recompute",
  queue: "commerce-carts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
