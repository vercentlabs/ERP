export const controlsSyncJob = {
  name: "compliance/controls.sync",
  queue: "compliance-controls",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
