export const taxDeclarationsRecomputeJob = {
  name: "payroll/tax-declarations.recompute",
  queue: "payroll-tax-declarations",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
