export const meteredUsageSyncJob = {
  name: "subscriptions/metered-usage.sync",
  queue: "subscriptions-metered-usage",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
