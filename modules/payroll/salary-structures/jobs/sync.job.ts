export const salaryStructuresSyncJob = {
  name: "payroll/salary-structures.sync",
  queue: "payroll-salary-structures",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
