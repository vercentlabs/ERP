export const deliveryNotesWebhookAdapter = {
  name: "sales/delivery-notes.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "sales/delivery-notes",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
