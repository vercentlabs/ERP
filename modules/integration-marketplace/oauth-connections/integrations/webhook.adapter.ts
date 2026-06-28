export const oauthConnectionsWebhookAdapter = {
  name: "integration-marketplace/oauth-connections.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "integration-marketplace/oauth-connections",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
