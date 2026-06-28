export const dataWarehouseSyncJob = {
  name: "data-platform/data-warehouse.sync",
  queue: "data-platform-data-warehouse",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
