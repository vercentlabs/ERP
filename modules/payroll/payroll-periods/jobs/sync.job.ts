export const payrollPeriodsSyncJob = {
  name: "payroll/payroll-periods.sync",
  queue: "payroll-payroll-periods",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
