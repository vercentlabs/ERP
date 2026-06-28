export const localizationsIndiaPfWebhookAdapter = {
  name: "payroll/localizations/india/pf.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/pf",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
