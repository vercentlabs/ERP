export const cycleCountsSyncJob = {
  name: "inventory/cycle-counts.sync",
  queue: "inventory-cycle-counts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
