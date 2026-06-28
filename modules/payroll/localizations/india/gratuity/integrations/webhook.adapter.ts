export const localizationsIndiaGratuityWebhookAdapter = {
  name: "payroll/localizations/india/gratuity.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/gratuity",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
