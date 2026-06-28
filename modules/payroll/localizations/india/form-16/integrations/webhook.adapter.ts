export const localizationsIndiaForm16WebhookAdapter = {
  name: "payroll/localizations/india/form-16.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/form-16",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
