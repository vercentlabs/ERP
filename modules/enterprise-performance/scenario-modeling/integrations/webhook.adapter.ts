export const scenarioModelingWebhookAdapter = {
  name: "enterprise-performance/scenario-modeling.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/scenario-modeling",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
