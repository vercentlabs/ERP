export const billOfMaterialsRecomputeJob = {
  name: "manufacturing/bill-of-materials.recompute",
  queue: "manufacturing-bill-of-materials",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
