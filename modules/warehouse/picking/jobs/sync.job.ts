export const pickingSyncJob = {
  name: "warehouse/picking.sync",
  queue: "warehouse-picking",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
