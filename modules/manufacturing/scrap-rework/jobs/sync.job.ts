export const scrapReworkSyncJob = {
  name: "manufacturing/scrap-rework.sync",
  queue: "manufacturing-scrap-rework",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
