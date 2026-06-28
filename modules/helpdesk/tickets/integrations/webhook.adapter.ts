export const ticketsWebhookAdapter = {
  name: "helpdesk/tickets.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/tickets",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
