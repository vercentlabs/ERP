export const workflowRecommendationsReminderJob = {
  name: "ai/workflow-recommendations.reminder",
  queue: "ai-workflow-recommendations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
