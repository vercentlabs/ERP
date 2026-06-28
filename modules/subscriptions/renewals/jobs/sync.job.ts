export const renewalsSyncJob = {
  name: "subscriptions/renewals.sync",
  queue: "subscriptions-renewals",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
