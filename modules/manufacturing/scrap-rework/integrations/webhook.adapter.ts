export const scrapReworkWebhookAdapter = {
  name: "manufacturing/scrap-rework.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/scrap-rework",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
