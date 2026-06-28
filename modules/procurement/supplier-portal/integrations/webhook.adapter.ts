export const supplierPortalWebhookAdapter = {
  name: "procurement/supplier-portal.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/supplier-portal",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
