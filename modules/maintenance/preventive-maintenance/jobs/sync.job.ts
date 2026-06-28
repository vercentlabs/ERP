export const preventiveMaintenanceSyncJob = {
  name: "maintenance/preventive-maintenance.sync",
  queue: "maintenance-preventive-maintenance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
