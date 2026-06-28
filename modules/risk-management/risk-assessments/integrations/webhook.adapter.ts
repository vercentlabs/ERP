export const riskAssessmentsWebhookAdapter = {
  name: "risk-management/risk-assessments.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/risk-assessments",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
