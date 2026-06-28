export const dataWarehouseRecomputeJob = {
  name: "data-platform/data-warehouse.recompute",
  queue: "data-platform-data-warehouse",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
