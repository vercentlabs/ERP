export const costCentersWebhookAdapter = {
  name: "finance/cost-centers.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/cost-centers",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
