export const dataRetentionWebhookAdapter = {
  name: "compliance/data-retention.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "compliance/data-retention",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
