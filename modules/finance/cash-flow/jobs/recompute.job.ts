export const cashFlowRecomputeJob = {
  name: "finance/cash-flow.recompute",
  queue: "finance-cash-flow",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
