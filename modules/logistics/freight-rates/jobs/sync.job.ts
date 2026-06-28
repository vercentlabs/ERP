export const freightRatesSyncJob = {
  name: "logistics/freight-rates.sync",
  queue: "logistics-freight-rates",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
