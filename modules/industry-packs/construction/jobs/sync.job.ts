export const constructionSyncJob = {
  name: "industry-packs/construction.sync",
  queue: "industry-packs-construction",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
