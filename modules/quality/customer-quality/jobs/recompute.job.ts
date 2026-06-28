export const customerQualityRecomputeJob = {
  name: "quality/customer-quality.recompute",
  queue: "quality-customer-quality",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
