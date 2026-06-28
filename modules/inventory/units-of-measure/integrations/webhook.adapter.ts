export const unitsOfMeasureWebhookAdapter = {
  name: "inventory/units-of-measure.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "inventory/units-of-measure",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
