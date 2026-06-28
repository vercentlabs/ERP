export const deliveryRunsWebhookAdapter = {
  name: "logistics/delivery-runs.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "logistics/delivery-runs",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
