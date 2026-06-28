export const emissionsWebhookAdapter = {
  name: "sustainability/emissions.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/emissions",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
