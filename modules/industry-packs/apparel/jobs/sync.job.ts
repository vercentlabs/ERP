export const apparelSyncJob = {
  name: "industry-packs/apparel.sync",
  queue: "industry-packs-apparel",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
