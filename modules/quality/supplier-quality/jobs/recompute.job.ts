export const supplierQualityRecomputeJob = {
  name: "quality/supplier-quality.recompute",
  queue: "quality-supplier-quality",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
