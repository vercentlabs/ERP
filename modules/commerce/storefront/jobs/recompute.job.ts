export const storefrontRecomputeJob = {
  name: "commerce/storefront.recompute",
  queue: "commerce-storefront",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
