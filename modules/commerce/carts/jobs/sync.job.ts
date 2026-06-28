export const cartsSyncJob = {
  name: "commerce/carts.sync",
  queue: "commerce-carts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
