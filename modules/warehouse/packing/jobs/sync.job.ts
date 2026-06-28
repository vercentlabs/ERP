export const packingSyncJob = {
  name: "warehouse/packing.sync",
  queue: "warehouse-packing",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
