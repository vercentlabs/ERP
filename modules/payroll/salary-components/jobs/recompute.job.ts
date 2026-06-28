export const salaryComponentsRecomputeJob = {
  name: "payroll/salary-components.recompute",
  queue: "payroll-salary-components",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
