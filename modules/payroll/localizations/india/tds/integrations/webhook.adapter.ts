export const localizationsIndiaTdsWebhookAdapter = {
  name: "payroll/localizations/india/tds.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/tds",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
