export const mrpSyncJob = {
  name: "manufacturing/mrp.sync",
  queue: "manufacturing-mrp",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
