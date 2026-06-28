export const supplierPortalRecomputeJob = {
  name: "procurement/supplier-portal.recompute",
  queue: "procurement-supplier-portal",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
