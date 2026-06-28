export const qualityInspectionsWebhookAdapter = {
  name: "quality/quality-inspections.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "quality/quality-inspections",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
