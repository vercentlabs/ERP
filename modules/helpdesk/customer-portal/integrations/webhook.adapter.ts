export const customerPortalWebhookAdapter = {
  name: "helpdesk/customer-portal.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/customer-portal",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
