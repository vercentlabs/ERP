export const workflowRecommendationsRecomputeJob = {
  name: "ai/workflow-recommendations.recompute",
  queue: "ai-workflow-recommendations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
