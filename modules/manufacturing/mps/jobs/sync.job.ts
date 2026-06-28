export const mpsSyncJob = {
  name: "manufacturing/mps.sync",
  queue: "manufacturing-mps",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
