export const inspectionPlansWebhookAdapter = {
  name: "quality/inspection-plans.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/inspection-plans",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
