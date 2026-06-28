export const profitabilityWebhookAdapter = {
  name: "projects/profitability.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/profitability",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
