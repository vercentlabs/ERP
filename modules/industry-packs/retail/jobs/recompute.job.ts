export const retailRecomputeJob = {
  name: "industry-packs/retail.recompute",
  queue: "industry-packs-retail",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
