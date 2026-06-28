export const blanketOrdersSyncJob = {
  name: "procurement/blanket-orders.sync",
  queue: "procurement-blanket-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
