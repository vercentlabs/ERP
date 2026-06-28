export const mrpWebhookAdapter = {
  name: "manufacturing/mrp.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/mrp",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
