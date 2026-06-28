export const localizationsIndiaGratuityReminderJob = {
  name: "payroll/localizations/india/gratuity.reminder",
  queue: "payroll-localizations-india-gratuity",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
