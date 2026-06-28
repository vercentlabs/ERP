export const apparelWebhookAdapter = {
  name: "industry-packs/apparel.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/apparel",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
