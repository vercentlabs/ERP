export const localizationsIndiaForm16ReminderJob = {
  name: "payroll/localizations/india/form-16.reminder",
  queue: "payroll-localizations-india-form-16",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
