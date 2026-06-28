export const deductionsRecomputeJob = {
  name: "payroll/deductions.recompute",
  queue: "payroll-deductions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
