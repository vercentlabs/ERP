export const fixedAssetsSyncJob = {
  name: "finance/fixed-assets.sync",
  queue: "finance-fixed-assets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
