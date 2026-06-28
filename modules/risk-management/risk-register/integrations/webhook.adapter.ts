export const riskRegisterWebhookAdapter = {
  name: "risk-management/risk-register.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/risk-register",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
