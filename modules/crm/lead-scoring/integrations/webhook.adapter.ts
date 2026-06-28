export const leadScoringWebhookAdapter = {
  name: "crm/lead-scoring.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "crm/lead-scoring",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
