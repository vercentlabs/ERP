export const putawaySyncJob = {
  name: "warehouse/putaway.sync",
  queue: "warehouse-putaway",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
