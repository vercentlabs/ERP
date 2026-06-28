export const localizationsIndiaEsiRecomputeJob = {
  name: "payroll/localizations/india/esi.recompute",
  queue: "payroll-localizations-india-esi",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
