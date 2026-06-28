export const supplierScorecardsWebhookAdapter = {
  name: "procurement/supplier-scorecards.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "procurement/supplier-scorecards",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
