export const mitigationsWebhookAdapter = {
  name: "risk-management/mitigations.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/mitigations",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
