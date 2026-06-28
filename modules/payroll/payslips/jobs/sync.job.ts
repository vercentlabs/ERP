export const payslipsSyncJob = {
  name: "payroll/payslips.sync",
  queue: "payroll-payslips",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
