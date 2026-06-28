export const localizationsIndiaProfessionalTaxInboundAdapter = {
  name: "payroll/localizations/india/professional-tax.inbound",
  direction: "inbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/professional-tax",
      adapter: "inbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
