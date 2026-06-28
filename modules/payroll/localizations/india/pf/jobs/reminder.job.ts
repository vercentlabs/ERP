export const localizationsIndiaPfReminderJob = {
  name: "payroll/localizations/india/pf.reminder",
  queue: "payroll-localizations-india-pf",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
