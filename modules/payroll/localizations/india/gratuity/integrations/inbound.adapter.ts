export const localizationsIndiaGratuityInboundAdapter = {
  name: "payroll/localizations/india/gratuity.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/gratuity",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
