export const taxDeclarationsWebhookAdapter = {
  name: "payroll/tax-declarations.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/tax-declarations",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
