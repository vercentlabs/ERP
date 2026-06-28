export const fiscalYearsWebhookAdapter = {
  name: "finance/fiscal-years.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/fiscal-years",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
