export const localizationsIndiaPfOutboundAdapter = {
  name: "payroll/localizations/india/pf.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/pf",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
