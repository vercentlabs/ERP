export const routingsWebhookAdapter = {
  name: "manufacturing/routings.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/routings",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
