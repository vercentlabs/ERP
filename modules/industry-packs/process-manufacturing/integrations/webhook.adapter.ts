export const processManufacturingWebhookAdapter = {
  name: "industry-packs/process-manufacturing.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/process-manufacturing",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
