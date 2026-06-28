export const salaryComponentsSyncJob = {
  name: "payroll/salary-components.sync",
  queue: "payroll-salary-components",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
