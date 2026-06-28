export const freightRatesRecomputeJob = {
  name: "logistics/freight-rates.recompute",
  queue: "logistics-freight-rates",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
