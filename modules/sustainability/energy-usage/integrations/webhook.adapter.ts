export const energyUsageWebhookAdapter = {
  name: "sustainability/energy-usage.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sustainability/energy-usage",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
