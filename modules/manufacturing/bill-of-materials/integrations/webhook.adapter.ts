export const billOfMaterialsWebhookAdapter = {
  name: "manufacturing/bill-of-materials.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/bill-of-materials",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
