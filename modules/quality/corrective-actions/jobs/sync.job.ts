export const correctiveActionsSyncJob = {
  name: "quality/corrective-actions.sync",
  queue: "quality-corrective-actions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
