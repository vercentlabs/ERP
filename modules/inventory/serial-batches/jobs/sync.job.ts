export const serialBatchesSyncJob = {
  name: "inventory/serial-batches.sync",
  queue: "inventory-serial-batches",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
