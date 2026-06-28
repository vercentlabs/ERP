export const automotiveRecomputeJob = {
  name: "industry-packs/automotive.recompute",
  queue: "industry-packs-automotive",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
