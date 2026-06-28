export const customDashboardsWebhookAdapter = {
  name: "extension-studio/custom-dashboards.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "extension-studio/custom-dashboards",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
