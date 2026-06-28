export const deductionsSyncJob = {
  name: "payroll/deductions.sync",
  queue: "payroll-deductions",
  async run(input: { tenantId: string; requestedBy?: string }) {
    return {
      ...input,
      job: "sync",
      completedAt: new Date().toISOString(),
    };
  },
};
