export const storefrontSyncJob = {
  name: "commerce/storefront.sync",
  queue: "commerce-storefront",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
