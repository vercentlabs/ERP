export const localizationsIndiaForm16OutboundAdapter = {
  name: "payroll/localizations/india/form-16.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/form-16",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
