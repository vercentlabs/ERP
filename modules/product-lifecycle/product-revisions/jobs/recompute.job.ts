export const productRevisionsRecomputeJob = {
  name: "product-lifecycle/product-revisions.recompute",
  queue: "product-lifecycle-product-revisions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
