export const vendorBillsRecomputeJob = {
  name: "procurement/vendor-bills.recompute",
  queue: "procurement-vendor-bills",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
