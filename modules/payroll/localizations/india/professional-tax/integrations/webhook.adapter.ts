export const localizationsIndiaProfessionalTaxWebhookAdapter = {
  name: "payroll/localizations/india/professional-tax.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/professional-tax",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
