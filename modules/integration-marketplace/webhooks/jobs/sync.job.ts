export const webhooksSyncJob = {
  name: "integration-marketplace/webhooks.sync",
  queue: "integration-marketplace-webhooks",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
