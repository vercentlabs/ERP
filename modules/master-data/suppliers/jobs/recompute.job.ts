export const suppliersRecomputeJob = {
  name: "master-data/suppliers.recompute",
  queue: "master-data-suppliers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
