export const customerAssetsRecomputeJob = {
  name: "field-service/customer-assets.recompute",
  queue: "field-service-customer-assets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
