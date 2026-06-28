export const publicApiWebhookAdapter = {
  name: "integration-marketplace/public-api.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/public-api",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
