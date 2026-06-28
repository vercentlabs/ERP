export const customerGroupsWebhookAdapter = {
  name: "commerce/customer-groups.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "commerce/customer-groups",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
