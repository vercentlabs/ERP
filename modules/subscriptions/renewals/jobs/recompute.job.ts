export const renewalsRecomputeJob = {
  name: "subscriptions/renewals.recompute",
  queue: "subscriptions-renewals",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
