export const localizationsIndiaTdsSyncJob = {
  name: "payroll/localizations/india/tds.sync",
  queue: "payroll-localizations-india-tds",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
