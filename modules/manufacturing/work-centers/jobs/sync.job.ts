export const workCentersSyncJob = {
  name: "manufacturing/work-centers.sync",
  queue: "manufacturing-work-centers",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
