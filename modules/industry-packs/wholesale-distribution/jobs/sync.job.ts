export const wholesaleDistributionSyncJob = {
  name: "industry-packs/wholesale-distribution.sync",
  queue: "industry-packs-wholesale-distribution",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
