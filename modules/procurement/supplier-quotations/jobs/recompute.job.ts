export const supplierQuotationsRecomputeJob = {
  name: "procurement/supplier-quotations.recompute",
  queue: "procurement-supplier-quotations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
