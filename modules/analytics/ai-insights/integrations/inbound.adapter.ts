export const aiInsightsInboundAdapter = {
  name: "analytics/ai-insights.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "analytics/ai-insights",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
