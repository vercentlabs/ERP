export const sparePartsRecomputeJob = {
  name: "maintenance/spare-parts.recompute",
  queue: "maintenance-spare-parts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
