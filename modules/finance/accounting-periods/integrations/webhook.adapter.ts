export const accountingPeriodsWebhookAdapter = {
  name: "finance/accounting-periods.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "finance/accounting-periods",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
