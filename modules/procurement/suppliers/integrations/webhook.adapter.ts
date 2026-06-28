export const suppliersWebhookAdapter = {
  name: "procurement/suppliers.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/suppliers",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
