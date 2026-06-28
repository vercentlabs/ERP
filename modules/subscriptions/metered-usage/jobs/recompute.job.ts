export const meteredUsageRecomputeJob = {
  name: "subscriptions/metered-usage.recompute",
  queue: "subscriptions-metered-usage",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
