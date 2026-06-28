export const cycleCountsWebhookAdapter = {
  name: "inventory/cycle-counts.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/cycle-counts",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
