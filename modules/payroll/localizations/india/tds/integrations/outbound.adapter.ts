export const localizationsIndiaTdsOutboundAdapter = {
  name: "payroll/localizations/india/tds.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/tds",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
