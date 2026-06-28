export const localizationsIndiaEsiOutboundAdapter = {
  name: "payroll/localizations/india/esi.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/esi",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
