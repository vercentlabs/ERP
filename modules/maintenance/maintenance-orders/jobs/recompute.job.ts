export const maintenanceOrdersRecomputeJob = {
  name: "maintenance/maintenance-orders.recompute",
  queue: "maintenance-maintenance-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
