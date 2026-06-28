export const transportCostingWebhookAdapter = {
  name: "logistics/transport-costing.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/transport-costing",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
