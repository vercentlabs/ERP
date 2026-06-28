export const shippingRecomputeJob = {
  name: "warehouse/shipping.recompute",
  queue: "warehouse-shipping",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
