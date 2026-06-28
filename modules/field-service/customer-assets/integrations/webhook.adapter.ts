export const customerAssetsWebhookAdapter = {
  name: "field-service/customer-assets.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "field-service/customer-assets",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
