export const customerAssetsSyncJob = {
  name: "field-service/customer-assets.sync",
  queue: "field-service-customer-assets",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
