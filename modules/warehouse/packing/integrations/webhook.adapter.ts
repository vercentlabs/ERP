export const packingWebhookAdapter = {
  name: "warehouse/packing.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/packing",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
