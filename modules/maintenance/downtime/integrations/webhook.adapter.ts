export const downtimeWebhookAdapter = {
  name: "maintenance/downtime.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "maintenance/downtime",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
