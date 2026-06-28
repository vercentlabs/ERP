export const locationsSyncJob = {
  name: "inventory/locations.sync",
  queue: "inventory-locations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
