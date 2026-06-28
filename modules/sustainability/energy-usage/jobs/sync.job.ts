export const energyUsageSyncJob = {
  name: "sustainability/energy-usage.sync",
  queue: "sustainability-energy-usage",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
