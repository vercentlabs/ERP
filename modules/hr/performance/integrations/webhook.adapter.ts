export const performanceWebhookAdapter = {
  name: "hr/performance.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "hr/performance",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
