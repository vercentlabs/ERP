export const deduplicationRecomputeJob = {
  name: "master-data/deduplication.recompute",
  queue: "master-data-deduplication",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
