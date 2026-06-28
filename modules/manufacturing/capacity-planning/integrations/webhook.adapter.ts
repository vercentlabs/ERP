export const capacityPlanningWebhookAdapter = {
  name: "manufacturing/capacity-planning.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "manufacturing/capacity-planning",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
