export const timesheetsWebhookAdapter = {
  name: "projects/timesheets.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "projects/timesheets",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
