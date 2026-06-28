export const routePlanningWebhookAdapter = {
  name: "field-service/route-planning.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "field-service/route-planning",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
