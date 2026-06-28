export const binsSyncJob = {
  name: "warehouse/bins.sync",
  queue: "warehouse-bins",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
