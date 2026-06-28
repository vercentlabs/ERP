export const semanticLayerWebhookAdapter = {
  name: "data-platform/semantic-layer.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "data-platform/semantic-layer",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
