export const suppliersRecomputeJob = {
  name: "procurement/suppliers.recompute",
  queue: "procurement-suppliers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
