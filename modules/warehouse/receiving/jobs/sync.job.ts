export const receivingSyncJob = {
  name: "warehouse/receiving.sync",
  queue: "warehouse-receiving",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
