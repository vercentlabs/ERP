export const localizationsIndiaTdsReminderJob = {
  name: "payroll/localizations/india/tds.reminder",
  queue: "payroll-localizations-india-tds",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
