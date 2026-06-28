export const localizationsIndiaPfSyncJob = {
  name: "payroll/localizations/india/pf.sync",
  queue: "payroll-localizations-india-pf",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
