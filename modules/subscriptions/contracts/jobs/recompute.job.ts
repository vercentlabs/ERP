export const contractsRecomputeJob = {
  name: "subscriptions/contracts.recompute",
  queue: "subscriptions-contracts",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
