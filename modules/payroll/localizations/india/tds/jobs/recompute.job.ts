export const localizationsIndiaTdsRecomputeJob = {
  name: "payroll/localizations/india/tds.recompute",
  queue: "payroll-localizations-india-tds",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
