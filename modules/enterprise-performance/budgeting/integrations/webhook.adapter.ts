export const budgetingWebhookAdapter = {
  name: "enterprise-performance/budgeting.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "enterprise-performance/budgeting",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
