export const plansRecomputeJob = {
  name: "subscriptions/plans.recompute",
  queue: "subscriptions-plans",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
