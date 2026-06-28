export const localizationsIndiaTdsInboundAdapter = {
  name: "payroll/localizations/india/tds.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/tds",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
