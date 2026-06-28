export const nonprofitSyncJob = {
  name: "industry-packs/nonprofit.sync",
  queue: "industry-packs-nonprofit",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
