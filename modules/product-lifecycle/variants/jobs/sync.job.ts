export const variantsSyncJob = {
  name: "product-lifecycle/variants.sync",
  queue: "product-lifecycle-variants",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
