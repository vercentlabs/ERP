export const replenishmentSyncJob = {
  name: "inventory/replenishment.sync",
  queue: "inventory-replenishment",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
