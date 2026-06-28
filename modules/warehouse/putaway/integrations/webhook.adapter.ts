export const putawayWebhookAdapter = {
  name: "warehouse/putaway.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "warehouse/putaway",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
