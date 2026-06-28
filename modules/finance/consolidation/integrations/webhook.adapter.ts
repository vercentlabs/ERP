export const consolidationWebhookAdapter = {
  name: "finance/consolidation.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/consolidation",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
