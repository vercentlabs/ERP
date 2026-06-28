export const purchaseReturnsWebhookAdapter = {
  name: "procurement/purchase-returns.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/purchase-returns",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
