export const lifecycleCostingWebhookAdapter = {
  name: "product-lifecycle/lifecycle-costing.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "product-lifecycle/lifecycle-costing",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
