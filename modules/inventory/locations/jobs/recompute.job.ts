export const locationsRecomputeJob = {
  name: "inventory/locations.recompute",
  queue: "inventory-locations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
