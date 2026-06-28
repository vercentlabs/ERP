export const payrollPeriodsRecomputeJob = {
  name: "payroll/payroll-periods.recompute",
  queue: "payroll-payroll-periods",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
