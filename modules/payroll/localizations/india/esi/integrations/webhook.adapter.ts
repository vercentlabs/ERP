export const localizationsIndiaEsiWebhookAdapter = {
  name: "payroll/localizations/india/esi.webhook",
  direction: "webhook",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/esi",
      adapter: "webhook",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
