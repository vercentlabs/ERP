export const wholesaleDistributionWebhookAdapter = {
  name: "industry-packs/wholesale-distribution.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "industry-packs/wholesale-distribution",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
