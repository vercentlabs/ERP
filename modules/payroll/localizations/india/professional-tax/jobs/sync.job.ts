export const localizationsIndiaProfessionalTaxSyncJob = {
  name: "payroll/localizations/india/professional-tax.sync",
  queue: "payroll-localizations-india-professional-tax",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
