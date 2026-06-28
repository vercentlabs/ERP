export const carriersSyncJob = {
  name: "logistics/carriers.sync",
  queue: "logistics-carriers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
