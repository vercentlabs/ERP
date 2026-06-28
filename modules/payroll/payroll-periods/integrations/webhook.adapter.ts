export const payrollPeriodsWebhookAdapter = {
  name: "payroll/payroll-periods.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/payroll-periods",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
