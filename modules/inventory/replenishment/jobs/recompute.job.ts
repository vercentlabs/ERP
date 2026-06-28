export const replenishmentRecomputeJob = {
  name: "inventory/replenishment.recompute",
  queue: "inventory-replenishment",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
