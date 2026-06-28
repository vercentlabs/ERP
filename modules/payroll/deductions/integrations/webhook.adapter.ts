export const deductionsWebhookAdapter = {
  name: "payroll/deductions.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/deductions",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
