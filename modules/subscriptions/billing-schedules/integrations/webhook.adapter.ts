export const billingSchedulesWebhookAdapter = {
  name: "subscriptions/billing-schedules.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "subscriptions/billing-schedules",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
