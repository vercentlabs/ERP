export const fiscalCalendarsWebhookAdapter = {
  name: "platform/fiscal-calendars.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "platform/fiscal-calendars",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
