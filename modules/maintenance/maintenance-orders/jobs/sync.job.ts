export const maintenanceOrdersSyncJob = {
  name: "maintenance/maintenance-orders.sync",
  queue: "maintenance-maintenance-orders",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
