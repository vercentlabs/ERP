export const carriersRecomputeJob = {
  name: "logistics/carriers.recompute",
  queue: "logistics-carriers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
