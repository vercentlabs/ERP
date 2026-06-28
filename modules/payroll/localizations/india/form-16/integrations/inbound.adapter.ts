export const localizationsIndiaForm16InboundAdapter = {
  name: "payroll/localizations/india/form-16.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/form-16",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
