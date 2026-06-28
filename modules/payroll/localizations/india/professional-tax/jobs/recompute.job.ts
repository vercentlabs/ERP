export const localizationsIndiaProfessionalTaxRecomputeJob = {
  name: "payroll/localizations/india/professional-tax.recompute",
  queue: "payroll-localizations-india-professional-tax",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
