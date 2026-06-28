export const localizationsIndiaEsiReminderJob = {
  name: "payroll/localizations/india/esi.reminder",
  queue: "payroll-localizations-india-esi",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "reminder",
      completedAt: new Date().toISOString(),
    };
  },
};
