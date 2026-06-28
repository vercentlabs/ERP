export const workflowRecommendationsOutboundAdapter = {
  name: "ai/workflow-recommendations.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/workflow-recommendations",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
