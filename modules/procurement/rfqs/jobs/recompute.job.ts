export const rfqsRecomputeJob = {
  name: "procurement/rfqs.recompute",
  queue: "procurement-rfqs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
