export const supplierSustainabilityRecomputeJob = {
  name: "sustainability/supplier-sustainability.recompute",
  queue: "sustainability-supplier-sustainability",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
