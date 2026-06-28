export const localizationsIndiaForm16SyncJob = {
  name: "payroll/localizations/india/form-16.sync",
  queue: "payroll-localizations-india-form-16",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
