export const taxesRecomputeJob = {
  name: "finance/taxes.recompute",
  queue: "finance-taxes",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
