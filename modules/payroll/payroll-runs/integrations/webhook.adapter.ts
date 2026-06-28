export const payrollRunsWebhookAdapter = {
  name: "payroll/payroll-runs.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/payroll-runs",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
