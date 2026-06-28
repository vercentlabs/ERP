export const dockManagementSyncJob = {
  name: "warehouse/dock-management.sync",
  queue: "warehouse-dock-management",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
