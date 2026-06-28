export const commissionsRecomputeJob = {
  name: "sales/commissions.recompute",
  queue: "sales-commissions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
