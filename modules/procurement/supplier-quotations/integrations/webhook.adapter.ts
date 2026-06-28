export const supplierQuotationsWebhookAdapter = {
  name: "procurement/supplier-quotations.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/supplier-quotations",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
