export const dataLakeRecomputeJob = {
  name: "data-platform/data-lake.recompute",
  queue: "data-platform-data-lake",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
