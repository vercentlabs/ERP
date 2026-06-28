export const connectorsWebhookAdapter = {
  name: "integration-marketplace/connectors.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/connectors",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
