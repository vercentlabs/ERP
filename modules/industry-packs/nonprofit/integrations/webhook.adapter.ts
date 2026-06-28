export const nonprofitWebhookAdapter = {
  name: "industry-packs/nonprofit.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/nonprofit",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
