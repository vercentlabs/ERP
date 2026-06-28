export const localizationsIndiaGratuityOutboundAdapter = {
  name: "payroll/localizations/india/gratuity.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/gratuity",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
