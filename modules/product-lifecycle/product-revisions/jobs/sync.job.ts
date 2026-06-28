export const productRevisionsSyncJob = {
  name: "product-lifecycle/product-revisions.sync",
  queue: "product-lifecycle-product-revisions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
