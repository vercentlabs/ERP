export const salesTargetsSyncJob = {
  name: "sales/sales-targets.sync",
  queue: "sales-sales-targets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
