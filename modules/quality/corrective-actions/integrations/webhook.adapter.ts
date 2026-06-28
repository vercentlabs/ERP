export const correctiveActionsWebhookAdapter = {
  name: "quality/corrective-actions.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/corrective-actions",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
