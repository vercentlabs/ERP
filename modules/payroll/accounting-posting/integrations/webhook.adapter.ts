export const accountingPostingWebhookAdapter = {
  name: "payroll/accounting-posting.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/accounting-posting",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
