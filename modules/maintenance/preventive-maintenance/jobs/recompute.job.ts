export const preventiveMaintenanceRecomputeJob = {
  name: "maintenance/preventive-maintenance.recompute",
  queue: "maintenance-preventive-maintenance",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
