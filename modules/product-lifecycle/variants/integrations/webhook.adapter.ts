export const variantsWebhookAdapter = {
  name: "product-lifecycle/variants.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/variants",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
