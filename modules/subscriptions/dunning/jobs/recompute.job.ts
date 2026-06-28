export const dunningRecomputeJob = {
  name: "subscriptions/dunning.recompute",
  queue: "subscriptions-dunning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
