export const incidentsWebhookAdapter = {
  name: "risk-management/incidents.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "risk-management/incidents",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
