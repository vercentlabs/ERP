export const aiInsightsSyncJob = {
  name: "analytics/ai-insights.sync",
  queue: "analytics-ai-insights",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
