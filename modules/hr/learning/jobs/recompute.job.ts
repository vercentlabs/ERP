export const learningRecomputeJob = {
  name: "hr/learning.recompute",
  queue: "hr-learning",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
