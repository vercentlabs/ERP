export const salaryStructuresRecomputeJob = {
  name: "payroll/salary-structures.recompute",
  queue: "payroll-salary-structures",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "recompute",
      completedAt: new Date().toISOString(),
    };
  },
};
