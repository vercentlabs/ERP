export const sustainabilityReportsWebhookAdapter = {
  name: "sustainability/sustainability-reports.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/sustainability-reports",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
