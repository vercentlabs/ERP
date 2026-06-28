export const dataRetentionRecomputeJob = {
  name: "compliance/data-retention.recompute",
  queue: "compliance-data-retention",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
