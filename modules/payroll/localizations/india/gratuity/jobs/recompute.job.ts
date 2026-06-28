export const localizationsIndiaGratuityRecomputeJob = {
  name: "payroll/localizations/india/gratuity.recompute",
  queue: "payroll-localizations-india-gratuity",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
