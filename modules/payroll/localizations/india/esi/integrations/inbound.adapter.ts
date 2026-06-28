export const localizationsIndiaEsiInboundAdapter = {
  name: "payroll/localizations/india/esi.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/esi",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
