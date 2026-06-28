export const payrollRunsSyncJob = {
  name: "payroll/payroll-runs.sync",
  queue: "payroll-payroll-runs",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
