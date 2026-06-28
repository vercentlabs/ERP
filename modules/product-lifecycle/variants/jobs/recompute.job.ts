export const variantsRecomputeJob = {
  name: "product-lifecycle/variants.recompute",
  queue: "product-lifecycle-variants",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
