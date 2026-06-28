export const internalControlsSyncJob = {
  name: "risk-management/internal-controls.sync",
  queue: "risk-management-internal-controls",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
