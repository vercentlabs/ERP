export const workflowRecommendationsWebhookAdapter = {
  name: "ai/workflow-recommendations.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/workflow-recommendations",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
