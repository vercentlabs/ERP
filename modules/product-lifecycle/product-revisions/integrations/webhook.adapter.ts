export const productRevisionsWebhookAdapter = {
  name: "product-lifecycle/product-revisions.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/product-revisions",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
