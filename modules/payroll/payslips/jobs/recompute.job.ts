export const payslipsRecomputeJob = {
  name: "payroll/payslips.recompute",
  queue: "payroll-payslips",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
