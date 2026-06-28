export const serialBatchesRecomputeJob = {
  name: "inventory/serial-batches.recompute",
  queue: "inventory-serial-batches",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
