export const dockManagementRecomputeJob = {
  name: "warehouse/dock-management.recompute",
  queue: "warehouse-dock-management",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
