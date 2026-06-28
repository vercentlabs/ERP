export const workflowRecommendationsInboundAdapter = {
  name: "ai/workflow-recommendations.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/workflow-recommendations",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
