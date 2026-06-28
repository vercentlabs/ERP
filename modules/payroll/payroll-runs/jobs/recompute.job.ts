export const payrollRunsRecomputeJob = {
  name: "payroll/payroll-runs.recompute",
  queue: "payroll-payroll-runs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
