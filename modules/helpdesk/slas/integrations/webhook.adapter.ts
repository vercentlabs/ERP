export const slasWebhookAdapter = {
  name: "helpdesk/slas.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "helpdesk/slas",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
