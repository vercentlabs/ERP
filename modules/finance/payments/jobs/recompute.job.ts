export const paymentsRecomputeJob = {
  name: "finance/payments.recompute",
  queue: "finance-payments",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
