export const documentIntelligenceWebhookAdapter = {
  name: "ai/document-intelligence.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "ai/document-intelligence",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
