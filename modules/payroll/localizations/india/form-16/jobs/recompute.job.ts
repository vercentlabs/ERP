export const localizationsIndiaForm16RecomputeJob = {
  name: "payroll/localizations/india/form-16.recompute",
  queue: "payroll-localizations-india-form-16",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
