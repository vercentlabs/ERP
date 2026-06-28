export const contactsWebhookAdapter = {
  name: "crm/contacts.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "crm/contacts",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
