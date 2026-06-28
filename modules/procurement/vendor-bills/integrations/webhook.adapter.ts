export const vendorBillsWebhookAdapter = {
  name: "procurement/vendor-bills.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/vendor-bills",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
