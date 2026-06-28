export const campaignsWebhookAdapter = {
  name: "crm/campaigns.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "crm/campaigns",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
