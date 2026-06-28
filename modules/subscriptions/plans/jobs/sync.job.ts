export const plansSyncJob = {
  name: "subscriptions/plans.sync",
  queue: "subscriptions-plans",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
