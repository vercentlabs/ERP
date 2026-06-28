export const purchaseRequisitionsSyncJob = {
  name: "procurement/purchase-requisitions.sync",
  queue: "procurement-purchase-requisitions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
