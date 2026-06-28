export const localizationsIndiaProfessionalTaxReminderJob = {
  name: "payroll/localizations/india/professional-tax.reminder",
  queue: "payroll-localizations-india-professional-tax",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
