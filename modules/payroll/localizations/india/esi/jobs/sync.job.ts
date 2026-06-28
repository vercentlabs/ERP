export const localizationsIndiaEsiSyncJob = {
  name: "payroll/localizations/india/esi.sync",
  queue: "payroll-localizations-india-esi",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
