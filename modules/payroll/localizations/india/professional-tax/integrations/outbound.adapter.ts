export const localizationsIndiaProfessionalTaxOutboundAdapter = {
  name: "payroll/localizations/india/professional-tax.outbound",
  direction: "outbound",
  normalize(payload: Record<string, unknown>) {
    return {
      module: "payroll/localizations/india/professional-tax",
      adapter: "outbound",
      payload,
      normalizedAt: new Date().toISOString(),
    };
  },
};
