export const locationsRecomputeJob = {
  name: "master-data/locations.recompute",
  queue: "master-data-locations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
