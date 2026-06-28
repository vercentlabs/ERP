export const discreteManufacturingWebhookAdapter = {
  name: "industry-packs/discrete-manufacturing.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/discrete-manufacturing",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
