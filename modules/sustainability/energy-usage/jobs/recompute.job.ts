export const energyUsageRecomputeJob = {
  name: "sustainability/energy-usage.recompute",
  queue: "sustainability-energy-usage",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
