export const workflowRecommendationsSyncJob = {
  name: "ai/workflow-recommendations.sync",
  queue: "ai-workflow-recommendations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
