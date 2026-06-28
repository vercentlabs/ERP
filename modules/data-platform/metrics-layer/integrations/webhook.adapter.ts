export const metricsLayerWebhookAdapter = {
  name: "data-platform/metrics-layer.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/metrics-layer",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
