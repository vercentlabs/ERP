export const localizationsIndiaGratuitySyncJob = {
  name: "payroll/localizations/india/gratuity.sync",
  queue: "payroll-localizations-india-gratuity",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
