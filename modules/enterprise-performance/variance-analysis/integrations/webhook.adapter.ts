export const varianceAnalysisWebhookAdapter = {
  name: "enterprise-performance/variance-analysis.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/variance-analysis",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
