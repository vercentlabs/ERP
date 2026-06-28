export const webhooksWebhookAdapter = {
  name: "integration-marketplace/webhooks.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/webhooks",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
