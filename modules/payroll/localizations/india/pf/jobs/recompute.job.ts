export const localizationsIndiaPfRecomputeJob = {
  name: "payroll/localizations/india/pf.recompute",
  queue: "payroll-localizations-india-pf",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
