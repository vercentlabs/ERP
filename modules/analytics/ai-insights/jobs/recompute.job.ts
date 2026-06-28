export const aiInsightsRecomputeJob = {
  name: "analytics/ai-insights.recompute",
  queue: "analytics-ai-insights",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
